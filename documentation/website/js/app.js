(function(){
    angular.module("cxgf-web", ['ngRoute'])

    .run(["$rootScope", function ($rootScope) {

        makePanelsCollapsible();


        function makePanelsCollapsible () {
            // var carets = '';
            // $('.panel-heading').addClass('collapse-header closed').append(carets);
            // $('.panel-body').addClass('collapse-body').hide();

            $('body').on('click', '.collapse-header', function () {
                if ($(this).hasClass('closed')) {
                    $(this).removeClass('closed').addClass('opened');
                    $(this).next('.collapse-body').slideDown();
                }
                else {
                    $(this).removeClass('opened').addClass('closed');
                    $(this).next('.collapse-body').slideUp();
                }
            })
        }
    }]);
})()