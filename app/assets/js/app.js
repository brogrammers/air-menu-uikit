'use strict';

angular.module('air-menu', ['air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {templateUrl: '/assets/pages/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/login', {templateUrl: '/assets/pages/login.html', controller: 'LoginCtrl'});
		$routeProvider.when('/documentation', {templateUrl: '/assets/pages/documentation.html', controller: 'DocumentationCtrl'});
		$routeProvider.otherwise({redirectTo: '/'});
	}])

	.run(['$rootScope', 'session', '$location', function($rootScope, session, $location) {
		session.setClient('468e35cd0cef4a31a3818bcadeb36dc6ed5e919ee64fce88c5296d6b48bfb529', '13e8a3df7bd4e14ed41d64d2cce7b42d722611ae3f89130e700959a047758f3b');
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
