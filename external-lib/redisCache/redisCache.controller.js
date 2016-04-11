(function() {
    'use strict';

    angular
        .module('azure')
        .controller('RedisCache', RedisCache);

    RedisCache.$inject = ['$scope'];

    function RedisCache($scope) {

        activate();

        function activate() { }
    }
})();
