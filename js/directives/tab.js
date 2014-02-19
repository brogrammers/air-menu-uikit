angular.module('air-menu-ui.directives.tab', [])

    .directive('tab', function() {
        return {
            scope: {
                title: '@'
            },
            require: '^nav',
            restrict: 'E',
            transclude: true,
            templateUrl: '/air-menu/tab.html',
            replace: true,
            link: function(scope, element, attrs, navCtrl) {
                navCtrl.addTab(scope);
            }
        }
    });