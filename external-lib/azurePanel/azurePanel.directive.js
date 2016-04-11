(function() {
    'use strict';

    angular
        .module('azure')
        .directive('azurePanel', azPanel);

    //azurePanel.$inject = ['config'];
    /* @ngInject */
    function azPanel() {
        //Usage:
        //<azure-panel services='azureServices'></azure-panel>"/>
        var directive = {
            scope: {
                'user': '='
            },
            controller: 'AzurePanel',
            restrict: 'E',
            templateUrl: 'external-lib/azurePanel/azurePanel.html'
        };
        return directive;
    }
})();
