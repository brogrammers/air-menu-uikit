'use strict';

angular.module('air-menu.controllers', [])
	.controller('MainCtrl', [ '$scope', '$rootScope', '$location', 'Me', function($scope, $rootScope, $location, Me) {
        Me.get(function(data) {
            $rootScope.user = data['me'];
            $rootScope.$broadcast('air-menu-ui.event.navbar.user', $rootScope.user);
        }, function(data) {
            $location.path('/login');
        });
	}])

	.controller('HomeCtrl', [ '$scope', 'Me', function($scope, Me) {

	}])

	.controller('LoginCtrl', [ '$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
        if ($scope.user) $location.path('/');
		$scope.handler = function(username, password, done) {
            $http({
                method: 'POST',
                url: '/login',
                params: {username: username, password: password},
                data: {username: username, password: password},
                headers: {
                    'X-CSRF-Token': window.CSRF_TOKEN
                }
            })
                .success(function(data, status) {
                    done(true);
                    location.replace('/');

                })
                .error(function(data, status) {
                    done(false);
                });
		}
	}])

	.controller('DocumentationCtrl', [ '$scope', 'Docs', function($scope, Docs) {
		$scope.fetch = function() {
			Docs.get(function(data) {
				$scope.docs = data['docs'];
			})
		};

		$scope.fetch();
	}]);