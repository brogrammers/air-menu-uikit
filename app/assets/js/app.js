'use strict';

angular.module('air-menu', ['air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {templateUrl: '/assets/pages/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/login', {templateUrl: '/assets/pages/login.html', controller: 'LoginCtrl'});
		$routeProvider.when('/documentation', {templateUrl: '/assets/pages/documentation.html', controller: 'DocumentationCtrl'});
        $routeProvider.when('/applications', {templateUrl: '/assets/pages/applications.html', controller: 'ApplicationsCtrl'});
        $routeProvider.when('/applications/new', {templateUrl: '/assets/pages/application_new.html', controller: 'NewApplicationCtrl'});
		$routeProvider.otherwise({redirectTo: '/'});
	}])

    .value('transitionMap', {
        "/documentation": {
            "/applications": 'flip'
        },
        "/applications": {
            "/applications/new": 'slide-enter'
        },
        "/applications/new": {
            "/applications": 'slide-leave'
        },
        "default": 'fade'
    });
