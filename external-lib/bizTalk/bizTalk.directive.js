(function() {
    'use strict';

    angular
        .module('azure.bizTalk')
        .directive('bizTalk', bizTalk);

    function bizTalk() {
        //Usage:
        //<biz-talk services='azureServices'></biz-talk>"/>
        var directive = {
            controller: 'BizTalk',
            restrict: 'E',
            templateUrl: 'external-lib/bizTalk/bizTalk.html'
        };
        return directive;
    }
})();
