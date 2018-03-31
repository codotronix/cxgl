(function(){
    //homeController
    angular.module("cxgf-web").controller("seeInActionController", seeInActionController);

    seeInActionController.$inject = ['$rootScope'];

    function seeInActionController ($rootScope) {
        $rootScope.pageID = 'seeinactionpage';
    }
})();