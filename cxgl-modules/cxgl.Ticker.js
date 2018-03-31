(function(window){

    window.cxgl.Ticker = {
        onTick: onTick,
        startTick: startTick,
        stopTick: stopTick,
        removeTick: removeTick
    };

    var _tickRunning = false;
    var _tickListeners = [];
    var _tickCounter = 0;
    var _tickResetUpperLimit = 27000000;    //27000000 ticks = 125 hours, given 60 ticks/sec


    /*
    * Add callback function to Ticker
    * skipTick: number of ticks to skip before the function is called again
    */
    function onTick (callbackFn, obj, skipTick) {
        var tickListenerID = cxgl.Utils.generateID('ticker');
        _tickListeners.push({
            id: tickListenerID,
            fn: callbackFn,
            obj: obj || window,
            skipTick: (skipTick === undefined || skipTick < 0) ? 1 : skipTick
        });

        //start the tick
        startTick();

        return tickListenerID;
    }


    function _gerenateUniqueID () {
        var tickID = (Math.random() * Math.random() * 999999999).toString().replace(/[.]/g, '-');

    }

    function startTick () {
        if(!_tickRunning) {
            _tickRunning = true;
            _tick();
        }        
    }

    function stopTick () {
        _tickRunning = false;
    }

    function _tick () {
        if(!_tickRunning) {
            return;
        }
        _tickCounter++;

        for(var i in _tickListeners) {
            if(_tickCounter % _tickListeners[i].skipTick === 0) {
                _tickListeners[i].fn.apply(_tickListeners[i].obj);
            }            
        }

        //reset the counter if a certain upper limit is reached
        // to prevent integer overflow kind of mess
        if(_tickCounter === _tickResetUpperLimit) {
            _tickCounter = 0;
        }

        setTimeout(_tick, 1000/60);
    }


    /*
    * When a particular callback function wants to remove itself from ticker
    */
    function removeTick (tickListenerID) {
        var success = false;
        for (var i=0; i<_tickListeners.length; i++) {
            if(_tickListeners[i].id === tickListenerID) {
                _tickListeners.splice(i, 1);
                success = true;
                break;
            }
        }

        return success;
    }
    


})(window);