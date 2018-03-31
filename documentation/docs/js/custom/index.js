//(function(){

    /*******************************************************/

    var b1 = cxgf.GameObject.create({
        x: 100,
        y: 100,
        height: 50,
        width: 50,
        speed: 7,
        htmlId: 'box1'
    });

    var collisionCounter = 0;
    b1.onCollision = function (collidingObj) {
        collisionCounter++;
        $('#collisioncounter').text(collisionCounter);
    };


    var b2 = window.cxgf.GameObject.create({
        x: 250,
        y: 100,
        height: 50,
        width: 50,
        speed: 5,
        htmlId: 'box2'
    });

    var b3 = window.cxgf.GameObject.create({
        x: 550,
        y: 80,
        speed: 2,
        htmlId: 'box3'
    });

    cxgf.KeyEvent.onKeyPress(cxgf.KeyEvent.keys.LEFT, b1.moveLeft, b1);
    cxgf.KeyEvent.onKeyPress(cxgf.KeyEvent.keys.RIGHT, b1.moveRight, b1);
    cxgf.KeyEvent.onKeyPress(cxgf.KeyEvent.keys.UP, b2.moveUp, b2);
    cxgf.KeyEvent.onKeyPress(cxgf.KeyEvent.keys.DOWN, b2.moveDown, b2);

    cxgf.Collision.watch(b1, b2);
    cxgf.Collision.startWatching();

    cxgf.Ticker.onTick(b3.move, b3);
    cxgf.Ticker.stopTick();
    /*********************************************************************/


    $('.panel-body').hide();
    $('.panel-body').eq(0).show();
    $('.panel-heading').on('click', function(){
        $('.panel-body').slideUp();
        $(this).next('.panel-body').slideDown();
    })
//})()