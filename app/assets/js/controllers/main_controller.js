angular.module('air-menu.controllers.main', [])

    .controller('MainCtrl', [ '$scope', '$rootScope', '$location', 'Me', 'transitionMap', function($scope, $rootScope, $location, Me, transitionMap) {
        $scope.transitionAnimation = transitionMap.default;

        $scope.isMobile = /iPhone/.test(navigator.userAgent);

        Me.get(function(user) {
            $rootScope.user = user;
            $rootScope.$broadcast('air-menu-ui.event.navbar.user', $rootScope.user);
        }, function() {
            if ($location.$$path != '/developer/documentation') {
                $location.path('/login');
            }
        });

        $rootScope.go = function(path) {
            var currentPath = $location.path();
            if (transitionMap[currentPath] && transitionMap[currentPath][path]) {
                $scope.transitionAnimation = transitionMap[currentPath][path];
            } else {
                $scope.transitionAnimation = transitionMap.default;
            }
            $location.path(path);
        };

        $scope.avatar = function(avatar, type, klass) {
            var path = '';
            if (avatar) path = avatar;
            else path = '/assets/' + (type||'profile') + '_placeholder.png';
            return '<img src="' + path + '" class="' + (klass||'img-responsive img-thumbnail') + '" />';
        }
    }]);