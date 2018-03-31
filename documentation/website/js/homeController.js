(function(){
    //homeController
    angular.module("cxgf-web").controller("homeController", homeController);

    homeController.$inject = ['$rootScope'];

    function homeController ($rootScope) {
        $rootScope.pageID = 'homepage';
    }
})();