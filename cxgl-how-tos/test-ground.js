//(function(){

    /*******************************************************/
    var ground = window.cxgl.GameObject.create({
        x: 0,
        y: 125,
        height: 10,
        width: 700,
        htmlId: 'ground',
        type: 'ground'
    });

    var b1 = cxgl.GameObject.create({
        x: 100,
        y: 0,
        height: 50,
        width: 50,
        speed: 7,
        htmlId: 'box1',
        gravityOn: true
    });

    var collisionCounter = 0;
    b1.onCollision = function (collidingObj) {
        collisionCounter++;
        $('#collisioncounter').text(collisionCounter);
    };


    var b2 = window.cxgl.GameObject.create({
        x: 250,
        y: 0,
        height: 50,
        width: 50,
        speed: 5,
        htmlId: 'box2',
        gravityOn: true
    });

    var b3 = window.cxgl.GameObject.create({
        x: 550,
        y: 80,
        speed: 2,
        htmlId: 'box3'
    });

    

    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.LEFT, b1.moveLeft, b1);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.RIGHT, b1.moveRight, b1);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.UP, b2.moveUp, b2);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.DOWN, b2.moveDown, b2);

    cxgl.Collision.watch(b1, b2);
    cxgl.Collision.watch(b1, ground);
    //cxgl.Collision.startWatching();

    cxgl.Ticker.onTick(b3.move, b3);
    //cxgl.Ticker.stopTick();
    /*********************************************************************/


    $('.panel-body').hide();
    $('.panel-body').eq(0).show();
    $('.panel-heading').on('click', function(){
        $('.panel-body').slideUp();
        $(this).next('.panel-body').slideDown();
    })
//})()