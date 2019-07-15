(function(){
    //homeController
    angular.module("cxgf-web").controller("demosController", demosController);

    demosController.$inject = ['$rootScope'];

    function demosController ($rootScope) {
        $rootScope.pageID = 'demopage';
        var vm = this;

        console.log('demopage');

        vm.demos = [
        	{
        		name: "Beware of Boxes",
				url: "http://barick.in/bob/?enemy=10",
				img: "documentation/website/img/bob/bob-1.png",
				desc: "In this world of moving boxes, you are a living box and there are lots of dead zombie boxes roaming around. You have to start from one safe house and reach another. That's all..."
        	}
        ];
    }
})();