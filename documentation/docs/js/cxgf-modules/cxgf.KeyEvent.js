(function(window){

    window.cxgf.KeyEvent = {
        onKeyPress: onKeyPress,

        keys: {
            "LEFT": 37,
            "UP": 38,
            "RIGHT": 39,
            "DOWN": 40,
            "SPACE": 32
        }
    };

    var _keyPressListeners = {};

    init();

    function init () {
        bindKeyPressEvent();
    }

    function onKeyPress (key, callbackFn, obj) {
        if(_keyPressListeners[key] == undefined) {
            _keyPressListeners[key] = [];
        }
        _keyPressListeners[key].push({
            fn: callbackFn,
            obj: obj
        });
    }


    function bindKeyPressEvent(){
        $(document).on('keydown', function(ev){
            //loop thru all listener object 
            //and call all listening callback functions
            for(var key in _keyPressListeners) {
                if(ev.keyCode == key) {
                    for(var i in _keyPressListeners[key]) {
                        _keyPressListeners[key][i].fn.apply(_keyPressListeners[key][i].obj);
                    }
                }
            }
        })
    }


})(window);