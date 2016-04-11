(function() {
    'use strict';

    angular
        .module('azure')
        .controller('Scheduler', Scheduler);

    Scheduler.$inject = ['$scope'];

    function Scheduler($scope) {

        activate();

        function activate() { }
    }
})();
