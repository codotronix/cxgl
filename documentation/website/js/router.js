(function(){
    angular.module("cxgf-web")
    .config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/home", {
            templateUrl: "documentation/website/templates/home.html",
            controller: "homeController",
            controllerAs: "vm"
        })
        .when("/see-it-in-action", {
            templateUrl: "documentation/website/templates/see-in-action.html",
            controller: "seeInActionController",
            controllerAs: "vm"
        })
        .when("/demos", {
            templateUrl: "documentation/website/templates/demos.html",
            controller: "demosController",
            controllerAs: "vm"
        })
        .when("/manual", {
            templateUrl: "documentation/website/templates/manual.html",
            controller: "manualController",
            controllerAs: "vm"
        })

        .when("/", {
            redirectTo: "/home"
        })
        .otherwise({
            redirectTo: "/"
        });

    }]);
})();