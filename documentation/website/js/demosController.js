(function(){
    //homeController
    angular.module("cxgf-web").controller("demosController", demosController);

    demosController.$inject = ['$rootScope'];

    function demosController ($rootScope) {
        $rootScope.pageID = 'demopage';
    }
})();