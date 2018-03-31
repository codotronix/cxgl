(function(){
    //homeController
    angular.module("cxgf-web").controller("manualController", manualController);

    manualController.$inject = ['$rootScope'];

    function manualController ($rootScope) {
        $rootScope.pageID = 'manualpage';

        var vm = this;

        // vm.topics = [
        //     {
        //         title: "GameObject Module (cxgf.GameObject)",
        //         URI: "" 
        //     },
        //     {
        //         title: "KeyEvent Module (cxgf.KeyEvent)",
        //         URI: "" 
        //     },
        //     {
        //         title: "Ticker Module (cxgf.Ticker)",
        //         URI: "" 
        //     },
        //     {
        //         title: "Collision Module (cxgf.Collision)",
        //         URI: "" 
        //     },
        // ];
    }
})();