'use strict';

angular.module('air-menu.controllers', [])

	.controller('MainCtrl', [ '$scope', '$rootScope', '$location', 'Me', 'transitionMap', 'UserOrders', 'Restaurants', function($scope, $rootScope, $location, Me, transitionMap, UserOrders, Restaurants) {
        $scope.transitionAnimation = transitionMap.default;
        $scope.restaurants = [ ];


        Me.get(function(user) {
            $rootScope.user = user;
            $rootScope.$broadcast('air-menu-ui.event.navbar.user', $rootScope.user);
        }, function() {
            $location.path('/login');
        });

        Restaurants.get(53.3478, -6.2397, 5000, function(restaurants) {
            $scope.restaurants = restaurants;
        }, function(error) {
            console.log(error);
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

        $scope.map = {
            center: {
                latitude: 53.3478,
                longitude: -6.2597
            },
            zoom: 14
        };
	}])

    .controller('RestaurantsCtrl', [ '$scope', 'CompanyRestaurants', function($scope, CompanyRestaurants) {
        $scope.restaurants = [];

        CompanyRestaurants.get($scope.user.company.id, function(restaurants) {
            $scope.restaurants = restaurants;
        })

    }])

    .controller('RestaurantCtrl', [ '$scope', 'Restaurants', 'RestaurantDevices', '$routeParams', function($scope, Restaurants, RestaurantDevices, $routeParams) {
        $scope.restaurant_id = $routeParams.id;

        Restaurants.show($scope.restaurant_id, function(restaurant) {
            $scope.restaurant = restaurant;
        });

        RestaurantDevices.get($scope.restaurant_id, function(devices) {
            console.log(devices);
        })
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

    .controller('DeveloperCtrl', [ '$scope', function($scope) {

    }])

	.controller('DocumentationCtrl', [ '$scope', 'Docs', '$location', function($scope, Docs, $location) {
		$scope.fetch = function() {
			Docs.get(function(data) {
				$scope.docs = data;
			});
		};

        $scope.handler = function(tab) {
            $scope.currentTab = tab;
            if ($scope.docs) {
                angular.forEach($scope.docs, function(doc) {
                    if (doc.version == tab.otitle) {
                        $scope.setBase(doc.content);
                    }
                });
            }
        };

        $scope.resourceClick = function(resource) {
            console.log(resource);
            $location.path('/documentation/' + resource.version + '/' + resource.name);
        };

        $scope.setBase = function(context) {
            $scope.name = context.name;
            $scope.info = context.info;
            $scope.path = context.api_url;
            $scope.baseUrl = window.API_BASE_URL;
        };

        $scope.scrollTo = function(selector) {
            $('html, body').animate({
                scrollTop: $(selector).offset().top
            }, 800);
        };

		$scope.fetch();
	}])

    .controller('ApplicationsCtrl', [ '$scope', 'Applications', function($scope, Applications) {
        $scope.applications = [];
        Applications.get(function(applications) {
            $scope.applications = applications;
        })
    }])

    .controller('NewApplicationCtrl', [ '$scope', 'Applications', '$location', function($scope, Applications, $location) {
        $scope.submit = function() {
            Applications.create($scope.name, $scope.redirect_uri, function(application) {
                $location.path('/developer/applications');
            });
        };
    }]);