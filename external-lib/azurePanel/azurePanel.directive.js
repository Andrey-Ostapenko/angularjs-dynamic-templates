(function() {
    'use strict';

    angular
        .module('azure')
        .directive('azurePanel', azPanel);

    function azPanel() {
        //Usage:
        //<azure-panel user='selectedUser'></azure-panel>"/>
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
