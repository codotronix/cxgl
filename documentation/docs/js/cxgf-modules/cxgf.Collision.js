(function(window){

    window.cxgf.Collision = {
        watch: watchCollision,
        isColliding: isColliding,
        startWatching: startWatching,
        stopWatching: stopWatching
    };

    /*
    * _collisionPairs will contain collision group pairs, e.g.
        [
            {
                group1: [StarA, StarB, StarC],
                group2: [RocketA, RocketB, RocketC]
            },
            {
                group1: [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5],
                group2: [Bullet1]
            }
        ]
    */
    var _collisionPairs = [];
    var collisionDetectionOn = false;

    /*
    * This function will add a pair of 2 collision groups into _collisionPairs
    */
    function watchCollision (objArr1, objArr2) {
        _collisionPairs.push({
            group1: $.isArray(objArr1) ? objArr1 : [objArr1],
            group2: $.isArray(objArr2) ? objArr2 : [objArr2]
        }); 
    }


    /*
    * This function will keep in running in a loop,
    * Detecting all the collisions between the object pairs present in
    * _collisionPairs
    */
    function startWatching () {
        if(!collisionDetectionOn) {
            collisionDetectionOn = true;
            _detectCollision();
        }
    }

    function stopWatching () {
        collisionDetectionOn = false;
    }

    /*
    * This function will loop thru all the collision pairs
    * to see if there is any collision.
    * If there is any collision, 
    * then "onCollision" function on that object is called
    */
    function _detectCollision () {
        if(!collisionDetectionOn || _collisionPairs.length <= 0) {
            return;
        }

        var pair;
        for (var i in _collisionPairs) {
            pair = _collisionPairs[i];
            
            for(var j in pair.group1) {
                for (var k in pair.group2) {
                    if(isColliding(pair.group1[j], pair.group2[k])) {
                        if(pair.group1[j].onCollision !== undefined) {
                            pair.group1[j].onCollision(pair.group2[k]);
                        }

                        if(pair.group2[k].onCollision !== undefined) {
                            pair.group2[k].onCollision(pair.group1[j]);
                        }
                    }
                }
            }
        }

        setTimeout(_detectCollision, 1000/60);
    }

    function isColliding (objA, objB) {
        if ((objA.x + objA.width) < objB.x
            || objA.x > (objB.x + objB.width)
            || (objA.y + objA.height) < objB.y
            || objA.y > (objB.y + objB.height)
            ) 
        {
            //no collision
            return false;
        }
        else {
            return true;
        }
    }

})(window);