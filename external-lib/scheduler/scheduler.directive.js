(function() {
    'use strict';

    angular
        .module('azure.bizTalk')
        .directive('scheduler', scheduler);

    function scheduler() {
        //Usage:
        //<scheduler></scheduler>"/>
        var directive = {
            controller: 'Scheduler',
            restrict: 'E',
            templateUrl: 'external-lib/scheduler/scheduler.html'
        };
        return directive;
    }
})();
