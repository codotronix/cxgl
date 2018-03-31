$(function(){

    //Create Box1 Object
    var b1 = cxgl.GameObject.create({
        x: 100,
        y: 100,
        height: 50,
        width: 50,
        speed: 7,
        htmlId: 'box1'
    });

    //Create Box2 Object
    var b2 = window.cxgl.GameObject.create({
        x: 250,
        y: 120,
        height: 50,
        width: 50,
        speed: 5,
        htmlId: 'box2'
    });

    //Set Collision Detection callback
    var collisionCounter = 0;
    b1.onCollision = function (collidingObj) {
        collisionCounter++;
        $('#collisioncounter').text(collisionCounter);
    };

    // Bind Arrow Keys with Box Movements
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.LEFT, b1.moveLeft, b1);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.RIGHT, b1.moveRight, b1);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.UP, b2.moveUp, b2);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.DOWN, b2.moveDown, b2);

    //Start Watching for collision
    cxgl.Collision.watch(b1, b2);

    //Start The Tick
    cxgl.Ticker.startTick();


    //focus to our demo
    $('.demo-box-container').focus();

});


