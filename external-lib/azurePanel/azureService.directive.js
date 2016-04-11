(function() {
    'use strict';

    angular
        .module('azure')
        .directive('azureService', azureService);

    azureService.$inject = ['$compile'];

    function azureService($compile) {
        //Usage:
        //<azure-service service='service'></azure-service>"/>
        var directive = {
            scope: {
                'service': '='
            },
            link: link,
            restrict: 'E'
        };
        return directive;

        function link(scope, element, attrs) {
            var newElement = angular.element(scope.service.type);
            element.append(newElement);
            $compile(newElement)(scope);
        }
    }
})();
