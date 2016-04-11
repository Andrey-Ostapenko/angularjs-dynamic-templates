(function() {
    'use strict';

    angular.module('azure', [
        'azure.core',
        'azure.activeDirectory',
        'azure.bizTalk',
        'azure.redisCache',
        'azure.scheduler'
        ]);
})();
