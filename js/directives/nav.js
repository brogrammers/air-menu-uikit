angular.module('air-menu-ui.directives.nav', [])

    .directive('nav', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/air-menu/nav.html',
            replace: true,
            scope: {
                handler: '='
            },
            controller: [ '$scope', '$element', function($scope, $element) {
                var tabs = $scope.tabs = [];

                $scope.select = function(tab) {
                    angular.forEach(tabs, function(tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    $scope.handler(tab);
                };

                this.addTab = function(tab) {
                    if (tabs.length == 0) $scope.select(tab);
                    tabs.push(tab);
                };
            }]
        }
    });