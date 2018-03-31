(function(){
    //homeController
    angular.module("cxgf-web").controller("mainController", mainController);

    mainController.$inject = ['$location', '$rootScope'];

    function mainController ($location, $rootScope) {
        var mvm = this;

        mvm.loadView = loadView;
        mvm.closeLeftBar = closeLeftBar;
        mvm.openLeftBar = openLeftBar;

        mvm.leftMenusItems = [
            {
                text: "Home",
                pageID: "homepage",
                url: "/home"
            },
            {
                text: "See it in Action",
                pageID: "seeinactionpage",
                url: "/see-it-in-action"
            },
            {
                text: "Demos",
                pageID: "demopage",
                url: "/demos"
            },
            {
                text: "Manual",
                pageID: "manualpage",
                url: "/manual"
            }
        ];

        function closeLeftBar () {
            $rootScope.leftBarClosed = true;
        }

        function openLeftBar () {
            $rootScope.leftBarClosed = false;
        }

        function loadView(viewUrl) {
            $location.path(viewUrl);
        }
    }
})();