/*
*   GameObjectConfig = {
        x: position_X
        y: position_Y
        speed:
        speedX: speedX || speed
        speedY: speedY || speed
        htmlId:

            // The property holdDirectionNTurns will be used for
            // random moves only. It indicates after how many turns or ticks
            // the direction should be randomized again
            // default is 10
        holdDirectionNTurns: 




*   }
*/


(function(window){

    window.cxgl.GameObject = {
        create: createObject,
        getAll: getAll
    };

    var _gameObjects = [];
    var _grounds = [];  //can stand on these, to be collision checked on gravity
    //var _objIDCounter = 0;

    init();

    /*
    * Create a Game Object
    * Must Pass the gameObjectConfig
        GameObjectConfig:
            x: position_X
            y: position_Y
            speed:
            speedX: speedX || speed
            speedY: speedY || speed
            htmlId:

                // The property holdDirectionNTurns will be used for
                // random moves only. It indicates after how many turns or ticks
                // the direction should be randomized again
                // default is 10
            holdDirectionNTurns:

    *
    */
    function createObject (gameObjectConfig) {
        var newGameObj = new _GameObject(gameObjectConfig);
        _gameObjects.push(newGameObj);

        if(newGameObj.type === 'ground') {
            _grounds.push(newGameObj);
        }

        return newGameObj;
    }


    /*
        Get All Game Objects that meet a certain criteria
        If no identifier is passed, return all the ojects


    */
    function getAll (identifierObj) {
        if(identifierObj === undefined) {
            return _gameObjects;
        }
        else {
            var resultObjects = [];

            for (var i=0; i<_gameObjects.length; i++) {
                for (var key in identifierObj) {
                    if(_gameObjects[i][key] === identifierObj[key]) {
                        resultObjects.push(_gameObjects[i]);
                    }
                }
            }

            return resultObjects;
        }
    }


    function _GameObject (gameObjectConfig) {
        //Blindly copy all the properties
        for(var key in gameObjectConfig) {
            this[key] = gameObjectConfig[key];
        }

        //Now set some defaults
        //this._objID = "cxglgo-" + _objIDCounter++;
        this._objID = cxgl.Utils.generateID('gobj');
        this.x = this.x || 0;
        this.y = this.y || 0;
        this.speed = this.speed || 1;
        this.speedX = this.speedX || this.speed;
        this.speedY = this.speedY || this.speed;
        //this.directionSense = this.directionSense || 4;
        this.holdDirectionNTurns = this.holdDirectionNTurns || 9;
        this.gravityOn = this.gravityOn || false;
        this.weight = this.weight || 1;             //100 is immovable object
        this.gravityIndex = this.gravityIndex || .5;

        this._speedDueToGravity = 0;
        //_gameObjects.push(this);

        this.render();
    }
    
    function init () {
        _initGameObjectCommonMethods();
        cxgl.Ticker.onTick(_watchGravity);
    }

    function _watchGravity() {
        for(var i = 0; i < _gameObjects.length; i++) {
            if(_gameObjects[i].gravityOn) {

                //Gravity increases speed
                _gameObjects[i]._speedDueToGravity += _gameObjects[i].gravityIndex;

                _gameObjects[i].y += _gameObjects[i]._speedDueToGravity;


                //TODO: Check if collision is happening at the bottom of object,
                // then only push object upwards
                if(cxgl.Collision.isCollidingGroup(_gameObjects[i], _grounds)) {
                    _gameObjects[i].y -= _gameObjects[i]._speedDueToGravity;
                    _gameObjects[i]._speedDueToGravity = 0;
                }

                _gameObjects[i].render();
            }
        }
    }

    function _initGameObjectCommonMethods () {
        _GameObject.prototype.render = function () {
            $('#'+this.htmlId).css({
                top: this.y + 'px',
                left: this.x + 'px'
            });
        };

        _GameObject.prototype.moveLeft = function () {
            this.x -= (this.speedX || this.speed);
            this.direction = "W";
            this.render();
        };

        _GameObject.prototype.moveRight = function () {
            this.x += (this.speedX || this.speed);
            this.direction = "E";
            this.render();
        };

        _GameObject.prototype.moveUp = function () {
            this.direction = "N";
            this.y -= (this.speedY || this.speed);
            this.render();
        };

        _GameObject.prototype.moveDown = function () {
            this.direction = "S";
            this.y += (this.speedY || this.speed);
            this.render();
        };

        _GameObject.prototype.move = function (direction) {
            if (direction === 'LEFT' || direction === 'W') {
                this.moveLeft();
            }
            else if (direction === 'RIGHT' || direction === 'E') {
                this.moveRight();
            }
            else if (direction === 'UP' || direction === 'N') {
                this.moveUp();
            }
            else if (direction === 'DOWN' || direction === 'S') {
                this.moveDown();
            }
            else if (direction === 'RANDOM-4' || direction === undefined) {
                 
                if(!this._holdDirectionCounter || this._holdDirectionCounter > this.holdDirectionNTurns) {
                    //First, calculate the possible directions
                    //Then randomly pick 1 among the possibilities
                    //to stop shaking behavior, restrict movement direction
                    if (this.prevDirection === 'N') {
                      this.direction = ['N','E','W'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'E') {
                      this.direction = ['N','E','S'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'S') {
                      this.direction = ['E','S','W'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'W') {
                      this.direction = ['N','S','W'][Math.floor(Math.random() * 3)];  
                    }
                    //1st time this.prevDirection will be undefined
                    else {
                      this.direction = ['E','W','N','S'][Math.floor(Math.random() * 4)];
                    }
                    
                    this.prevDirection = this.direction;
                    this._holdDirectionCounter = 0;
                }
                
                this._holdDirectionCounter++;                
                this.move(this.direction);
            }
        };

        _GameObject.prototype.startContinuousMove = function (skipTick, isRandom) {
            if (!this.continuousMoveCBRef) {
                this.continuousMoveCBRef = cxgl.Ticker.onTick(moveInDirection, undefined, skipTick)
            }

            var _this = this;
            function moveInDirection () {
                if(!isRandom) {
                    _this.move(_this.direction);
                }
                else {
                    _this.move();
                }
                
            }
        }

        _GameObject.prototype.stopContinuousMove = function () {
            cxgl.Ticker.removeTick(this.continuousMoveCBRef);
            this.continuousMoveCBRef = undefined;
        }

        _GameObject.prototype.turnAround = function () {
            var oppositeDirections = {
                'E': 'W',
                'W': 'E',
                'N': 'S',
                'S': 'N'
            };

            this.direction = oppositeDirections[this.direction];
            this.move(this.direction);
        }

        _GameObject.prototype.onCollision = function (collidingObj) {
            //console.log(this);
            //console.log(" is in collision with ");
            //console.log(collidingObj);

        };
    }


})(window);









/*

(function(window){
    window.cxgl.GameObject = (function () {
        var _objIDCounter = 0;

        function GameObject(gameObjectConfig) {

            //Blindly copy all the properties
            for(var key in gameObjectConfig) {
                this[key] = gameObjectConfig[key];
            }

            //Now set some defaults
            this._objID = "cxglgo-" + _objIDCounter;
            this.x = this.x || 0;
            this.y = this.y || 0;
            this.speed = this.speed || 1;
            this.speedX = this.speedX || this.speed;
            this.speedY = this.speedY || this.speed;
            this.directionSense = this.directionSense || 4;
            this.holdDirectionNTurns = this.holdDirectionNTurns || 9;

            //_gameObjects.push(this);

            this.render();
        }

        GameObject.prototype.render = function () {
            $('#'+this.htmlId).css({
                top: this.y + 'px',
                left: this.x + 'px'
            });
        };

        GameObject.prototype.moveLeft = function () {
            this.x -= (this.speedX || this.speed);
            this.render();
        };

        GameObject.prototype.moveRight = function () {
            this.x += (this.speedX || this.speed);
            this.render();
        };

        GameObject.prototype.moveUp = function () {
            this.y -= (this.speedY || this.speed);
            this.render();
        };

        GameObject.prototype.moveDown = function () {
            this.y += (this.speedY || this.speed);
            this.render();
        };

        GameObject.prototype.move = function (direction) {
            if (direction === 'LEFT' || direction === 'W') {
                this.moveLeft();
            }
            else if (direction === 'RIGHT' || direction === 'E') {
                this.moveRight();
            }
            else if (direction === 'UP' || direction === 'N') {
                this.moveUp();
            }
            else if (direction === 'down' || direction === 'S') {
                this.moveDown();
            }
            else if (direction === 'RANDOM-4' || direction === undefined) {
                 
                if(!this._holdDirectionCounter || this._holdDirectionCounter > this.holdDirectionNTurns) {
                    //First, calculate the possible directions
                    //Then randomly pick 1 among the possibilities
                    //to stop shaking behavior, restrict movement direction
                    if (this.prevDirection === 'N') {
                      this.direction = ['N','E','W'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'E') {
                      this.direction = ['N','E','S'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'S') {
                      this.direction = ['E','S','W'][Math.floor(Math.random() * 3)];  
                    }
                    else if (this.prevDirection === 'W') {
                      this.direction = ['N','S','W'][Math.floor(Math.random() * 3)];  
                    }
                    //1st time this.prevDirection will be undefined
                    else {
                      this.direction = ['E','W','N','S'][Math.floor(Math.random() * 4)];
                    }
                    
                    this.prevDirection = this.direction;
                    this._holdDirectionCounter = 0;
                }
                
                this._holdDirectionCounter++;                
                this.move(this.direction);
            }
        };

        GameObject.prototype.turnAround = function () {
            var oppositeDirections = {
                'E': 'W',
                'W': 'E',
                'N': 'S',
                'S': 'N'
            };

            this.direction = oppositeDirections[this.direction];
            this.move(this.direction);
        }

        GameObject.prototype.onCollision = function (collidingObj) {
            //console.log(this);
            //console.log(" is in collision with ");
            //console.log(collidingObj);
        };

        return GameObject;
    }());

})(window);

*/