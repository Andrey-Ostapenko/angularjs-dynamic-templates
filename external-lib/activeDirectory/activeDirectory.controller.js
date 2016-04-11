(function() {
    'use strict';

    angular
        .module('azure')
        .controller('ActiveDirectory', ActiveDirectory);

    ActiveDirectory.$inject = ['$scope'];

    function ActiveDirectory($scope) {

        activate();

        function activate() { }
    }
})();
