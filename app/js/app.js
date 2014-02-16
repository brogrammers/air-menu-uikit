'use strict';

angular.module('air-menu', ['air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {templateUrl: 'partials/pages/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/login', {templateUrl: 'partials/pages/login.html', controller: 'LoginCtrl'});
		$routeProvider.when('/documentation', {templateUrl: 'partials/pages/documentation.html', controller: 'DocumentationCtrl'});
		$routeProvider.otherwise({redirectTo: '/'});
	}])

	.run(['$rootScope', 'session', '$location', function($rootScope, session, $location) {
		$rootScope.$on( "$routeChangeStart", function(event, next, current) {
			session.restore();
			if (!session.isSet() && next.templateUrl != "partials/pages/login.html") {
				$location.path("/login");
			}
			if (session.isSet() && next.templateUrl == "partials/pages/login.html") {
				$location.path("/");
			}
		});

		$rootScope.$on('air-menu-ui.event.unauthorized', function(event, data) {
			session.refresh();
		});

		$rootScope.$on('air-menu-ui.event.userLoggedOut', function(event, data) {
			$location.path('/');
		});

		$rootScope.$on('air-menu-ui.event.routeNotFound', function(event) {
			$location.path('/');
		});
	}]);