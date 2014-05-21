'use strict';

angular.module('air-menu', ['air-menu.animations', 'air-menu.filters', 'air-menu.services', 'air-menu.directives', 'air-menu.controllers', 'air-menu-ui', 'google-maps'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: '/assets/pages/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/login', {templateUrl: '/assets/pages/login.html', controller: 'LoginCtrl'});
        $routeProvider.when('/developer', {templateUrl: '/assets/pages/developer.html', controller: 'DeveloperCtrl'});
        $routeProvider.when('/developer/documentation', {templateUrl: '/assets/pages/documentation.html', controller: 'DocumentationCtrl'});
        $routeProvider.when('/developer/applications', {templateUrl: '/assets/pages/applications.html', controller: 'ApplicationsCtrl'});
        $routeProvider.when('/developer/applications/new', {templateUrl: '/assets/pages/application.html', controller: 'ApplicationCtrl'});
        $routeProvider.when('/restaurants', {templateUrl: '/assets/pages/restaurants.html', controller: 'RestaurantsCtrl'});
        $routeProvider.when('/restaurants/:id', {templateUrl: '/assets/pages/restaurant.html', controller: 'RestaurantCtrl'});

        $routeProvider.when('/m/restaurants/:id/devices', {templateUrl: '/assets/pages/devices.html', controller: 'DevicesCtrl'});
        $routeProvider.when('/m/restaurants/:id/devices/new', {templateUrl: '/assets/pages/device.html', controller: 'DeviceCtrl'});
        $routeProvider.when('/m/restaurants/:id/devices/:device_id', {templateUrl: '/assets/pages/device.html', controller: 'DeviceCtrl'});

        $routeProvider.when('/m/restaurants/:id/groups', {templateUrl: '/assets/pages/groups.html', controller: 'GroupsCtrl'});
        $routeProvider.when('/m/restaurants/:id/groups/new', {templateUrl: '/assets/pages/group.html', controller: 'GroupCtrl'});
        $routeProvider.when('/m/restaurants/:id/groups/:group_id', {templateUrl: '/assets/pages/group.html', controller: 'GroupCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .value('transitionMap', {
        "/developer": {
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
