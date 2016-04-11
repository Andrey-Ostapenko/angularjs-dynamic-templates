(function() {
    'use strict';

    angular
        .module('azure')
        .controller('AzurePanel', AzurePanel);

    AzurePanel.$inject = ['$scope', 'azureapi'];

    function AzurePanel($scope, azureapi) {

        $scope.servicesLoaded = false;

        activate();

        function activate() {
            azureapi.getAzureServices($scope.user.id)
                .then(function(data) {
                    $scope.user.services = data;
                    $scope.servicesLoaded = true;
                });
        }

        $scope.$watch('user', function(newValue, oldValue) {
            activate();
        });
    }
})();
