(function() {
    'use strict';

    var app = angular.module('app', ['azure']);

    app.controller('appCtrl', AppCtrl);

    AppCtrl.$inject = ['$rootScope', '$scope'];

    function AppCtrl($rootScope, $scope) {
        $scope.users = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        activate();

        function activate() {
            $scope.selectedUser = $scope.users[0];
        }

        $scope.selectUser = function(id) {
            $scope.selectedUser = $scope.users[id - 1];
        };

    }

})();
