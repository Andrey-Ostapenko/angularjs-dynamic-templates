(function() {
    'use strict';

    angular
        .module('azure')
        .controller('BizTalk', BizTalk);

    BizTalk.$inject = ['$scope'];

    function BizTalk($scope) {

        activate();

        function activate() { }
    }
})();
