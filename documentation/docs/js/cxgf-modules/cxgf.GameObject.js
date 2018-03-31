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

    window.cxgf.GameObject = {
        create: createObject
    };

    var _gameObjects = [];
    var _objIDCounter = 0;

    init();

    /*
    * Create a Game Object
    * Must Pass the gameObjectConfig
        GameObjectConfig = {
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
    function createObject (gameObjectConfig) {
        var newGameObj = new _GameObject(gameObjectConfig);
        _gameObjects.push(newGameObj);
        return newGameObj;
    }


    function _GameObject (gameObjectConfig) {
        //Blindly copy all the properties
        for(var key in gameObjectConfig) {
            this[key] = gameObjectConfig[key];
        }

        //Now set some defaults
        this._objID = "cxgfgo-" + _objIDCounter++;
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
    
    function init () {
        _initGameObjectCommonMethods();
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
            this.render();
        };

        _GameObject.prototype.moveRight = function () {
            this.x += (this.speedX || this.speed);
            this.render();
        };

        _GameObject.prototype.moveUp = function () {
            this.y -= (this.speedY || this.speed);
            this.render();
        };

        _GameObject.prototype.moveDown = function () {
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
    window.cxgf.GameObject = (function () {
        var _objIDCounter = 0;

        function GameObject(gameObjectConfig) {

            //Blindly copy all the properties
            for(var key in gameObjectConfig) {
                this[key] = gameObjectConfig[key];
            }

            //Now set some defaults
            this._objID = "cxgfgo-" + _objIDCounter;
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