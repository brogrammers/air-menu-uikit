'use strict';

angular.module('air-menu', ['air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {templateUrl: '/assets/pages/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/login', {templateUrl: '/assets/pages/login.html', controller: 'LoginCtrl'});
		$routeProvider.when('/documentation', {templateUrl: '/assets/pages/documentation.html', controller: 'DocumentationCtrl'});
        $routeProvider.when('/applications', {templateUrl: '/assets/pages/applications.html', controller: 'ApplicationsCtrl'});
		$routeProvider.otherwise({redirectTo: '/'});
	}]);
