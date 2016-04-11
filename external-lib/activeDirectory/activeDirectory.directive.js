(function() {
    'use strict';

    angular
        .module('azure.activeDirectory')
        .directive('activeDirectory', activeDirectory);

    function activeDirectory() {
        //Usage:
        //<active-directory></active-directory>"/>
        var directive = {
            controller: 'ActiveDirectory',
            restrict: 'E',
            templateUrl: 'external-lib/activeDirectory/activeDirectory.html'
        };
        return directive;
    }
})();
