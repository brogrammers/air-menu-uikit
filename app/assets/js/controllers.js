'use strict';

angular.module('air-menu.controllers', [])
	.controller('MainCtrl', [ '$scope', '$rootScope', '$location', 'Me', function($scope, $rootScope, $location, Me) {
        Me.get(function(user) {
            $rootScope.user = user;
            $rootScope.$broadcast('air-menu-ui.event.navbar.user', $rootScope.user);
        }, function() {
            $location.path('/login');
        });
	}])

	.controller('HomeCtrl', [ '$scope', 'Me', function($scope, Me) {

	}])

	.controller('LoginCtrl', [ '$scope', '$rootScope', '$location', 'login', function($scope, $rootScope, $location, login) {
        if ($scope.user) $location.path('/');
		$scope.handler = function(username, password, done) {
            login(username, password, function() {
                done(true);
                location.replace('/');
            }, function() {
                done(false);
            })
		}
	}])

	.controller('DocumentationCtrl', [ '$scope', 'Docs', function($scope, Docs) {
		$scope.fetch = function() {
			Docs.get(function(data) {
				$scope.docs = data['docs'];
			})
		};

		$scope.fetch();
	}])

    .controller('ApplicationsCtrl', [ '$scope', 'Applications', function($scope, Applications) {
        $scope.applications = [];
        Applications.get(function(applications) {
            $scope.applications = applications;
        })
    }]);