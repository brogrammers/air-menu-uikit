angular.module('air-menu-ui.directives.application', [])

    .directive('oauthApplication', function() {
        return {
            scope: {
                application: '='
            },
            restrict: 'E',
            templateUrl: '/air-menu/application.html',
            controller: [ '$scope', function($scope) {

            }]
        }
    });