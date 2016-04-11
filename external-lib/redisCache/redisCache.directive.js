(function() {
    'use strict';

    angular
        .module('azure.redisCache')
        .directive('redisCache', redisCache);

    function redisCache() {
        //Usage:
        //<redis-cache services='azureServices'></redis-cache>"/>
        var directive = {
            controller: 'RedisCache',
            restrict: 'E',
            templateUrl: 'external-lib/redisCache/redisCache.html'
        };
        return directive;
    }
})();
