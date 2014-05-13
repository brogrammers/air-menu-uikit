'use strict';

angular.module('air-menu', ['air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui', 'google-maps'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: '/assets/pages/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/login', {templateUrl: '/assets/pages/login.html', controller: 'LoginCtrl'});
        $routeProvider.when('/developer', {templateUrl: '/assets/pages/developer.html', controller: 'DeveloperCtrl'});
        $routeProvider.when('/developer/documentation', {templateUrl: '/assets/pages/documentation.html', controller: 'DocumentationCtrl'});
        $routeProvider.when('/developer/applications', {templateUrl: '/assets/pages/applications.html', controller: 'ApplicationsCtrl'});
        $routeProvider.when('/developer/applications/new', {templateUrl: '/assets/pages/application_new.html', controller: 'NewApplicationCtrl'});
        $routeProvider.when('/restaurants', {templateUrl: '/assets/pages/restaurants.html', controller: 'RestaurantsCtrl'});
        $routeProvider.when('/restaurants/:id', {templateUrl: '/assets/pages/restaurant.html', controller: 'RestaurantCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .value('transitionMap', {
        "/developer/documentation": {
            "/developer/applications": 'flip'
        },
        "/developer/applications": {
            "/developer/applications/new": 'slide-enter'
        },
        "/developer/applications/new": {
            "/developer/applications": 'slide-leave'
        },
        "default": 'fade'
    });
