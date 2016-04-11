(function() {
    'use strict';

    angular
        .module('azure.core')
        .factory('azureapi', azureapi);

    azureapi.$inject = ['$q', '$timeout'];

    function azureapi($q, $timeout) {
        var users = [
            {
                id: 1,
                services: [
                    {
                        type: '<biz-talk></biz-talk>',
                        title: 'BizTalk Azure',
                        image: 'images/bizTalk.png'
                    },
                    {
                        type: '<scheduler></scheduler>',
                        title: 'Scheduler Azure',
                        image: 'images/azure-scheduler.png'
                    },
                    {
                        type: '<redis-cache></redis-cache>',
                        title: 'Redis Cache Azure',
                        image01: 'images/redis-cache-01.png',
                        image02: 'images/redis-cache-02.jpg'
                    }
                ]
            },
            {
                id: 2,
                services: [
                    {
                        type: '<active-directory></active-directory>',
                        title: 'Active Directory',
                        image: 'images/activeDirectory.png'
                    },
                    {
                        type: '<redis-cache></redis-cache>',
                        title: 'Redis Cache Azure',
                        image01: 'images/redis-cache-01.png',
                        image02: 'images/redis-cache-02.jpg'
                    },
                    {
                        type: '<biz-talk></biz-talk>',
                        title: 'BizTalk Azure',
                        image: 'images/bizTalk.png'
                    },
                ]
            }
        ];

        var service = {
            getAzureServices: getAzureServices
        };

        return service;

        function getAzureServices(userId) {
            var deferred = $q.defer();

            var services = [];

            $timeout(function() {

                // amazing implementation
                services = users[userId - 1].services;

                deferred.resolve(services);
            }, 1000);

            return deferred.promise;
        }
    }
})();
