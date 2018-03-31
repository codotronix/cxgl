$(function(){

    //Create Box1 Object
    var b1 = cxgl.GameObject.create({
        x: 100,
        y: 0,
        height: 20,
        width: 20,
        speed: 7,
        htmlId: 'box1',
        gravityOn: true,
        gravityIndex: .3
    });

    //Create Ground 1 Object
    var g1 = window.cxgl.GameObject.create({
        x: 0,
        y: 100,
        height: 10,
        width: 300,
        htmlId: 'ground1',
        type: 'ground'
    });

    //Create Ground 2 Object
    var g2 = window.cxgl.GameObject.create({
        x: 220,
        y: 220,
        height: 10,
        width: 300,
        htmlId: 'ground2',
        type: 'ground'
    });

    //Create Ground 3 Object
    var g3 = window.cxgl.GameObject.create({
        x: 0,
        y: 350,
        height: 10,
        width: 300,
        htmlId: 'ground3',
        type: 'ground'
    });

    //Create Ground 4 Object
    var g4 = window.cxgl.GameObject.create({
        x: 450,
        y: 350,
        height: 10,
        width: 300,
        htmlId: 'ground4',
        type: 'ground'
    });

    // Bind Arrow Keys with Box Movements
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.LEFT, b1.moveLeft, b1);
    cxgl.KeyEvent.onKeyPress(cxgl.KeyEvent.keys.RIGHT, b1.moveRight, b1);

    //Start Watching for collision
    cxgl.Collision.watch(b1, g1);
    cxgl.Collision.watch(b1, g2);
    cxgl.Collision.watch(b1, g3);
    cxgl.Collision.watch(b1, g4);
    

    //Start The Tick
    cxgl.Ticker.startTick();


    //focus to our demo
    $('.demo-box-container').focus();

});


