'use strict';

angular.module('air-menu.controllers', [])

	.controller('MainCtrl', [ '$scope', '$rootScope', '$location', 'Me', 'transitionMap', 'UserOrders', 'Restaurants', 'btfModal', function($scope, $rootScope, $location, Me, transitionMap, UserOrders, Restaurants, btfModal) {
        $scope.transitionAnimation = transitionMap.default;

        Me.get(function(user) {
            $rootScope.user = user;
            $rootScope.$broadcast('air-menu-ui.event.navbar.user', $rootScope.user);
        }, function() {
            $location.path('/login');
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

        $scope.avatar = function(avatar, type) {
            var path = '';
            if (avatar) {
                path = avatar;
            } else {
                path = '/assets/' + (type||'profile') + '_placeholder.png';
            }
            return '<img src="' + path + '" class="img-responsive img-thumbnail" />';
        }
	}])

    .controller('RestaurantsCtrl', [ '$scope', 'CompanyRestaurants', function($scope, CompanyRestaurants) {
        $scope.restaurants = [ ];

        console.log('ok');
        CompanyRestaurants.get($scope.user.company.id, function(restaurants) {
            $scope.restaurants = restaurants;
        })

    }])

    .controller('ModalCtrl', [ '$scope', function($scope) {

    }])

    .controller('RestaurantCtrl', [ '$scope', 'Restaurants', 'RestaurantDevices', 'RestaurantGroups', 'RestaurantReviews', '$routeParams', 'parallaxHelper', 'btfModal', function($scope, Restaurants, RestaurantDevices, RestaurantGroups, RestaurantReviews, $routeParams, parallaxHelper, btfModal) {
        $scope.restaurant_id = $routeParams.id;
        $scope.restaurant = { description: '',location: { latitude: 53.3478, longitude: -6.2597 } };
        $scope.pending = { };
        $scope.pending.devices = true;
        $scope.pending.groups = true;
        $scope.pending.reviews = true;
        $scope.devices = [ ];
        $scope.groups = [ ];
        $scope.reviews = [ ];
        $scope.deviceEditMode = false;
        $scope.groupEditMode = false;
        $scope.readMore = false;
        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

        $scope.modal = btfModal({
            controller: 'ModalCtrl',
            controllerAs: 'modal',
            templateUrl: '/assets/pages/device.html'
        });

        Restaurants.show($scope.restaurant_id, function(restaurant) {
            $scope.restaurant = restaurant;
            $scope.mapLocation(restaurant.location.latitude, restaurant.location.longitude);
            $scope.refreshMap = true;
        });

        $scope.mapLocation = function(latitude, longitude) {
            $scope.map = {
                center: {
                    latitude: latitude || 53.3478,
                    longitude: longitude || -6.2597
                },
                zoom: 14
            };
        };

        RestaurantDevices.get($scope.restaurant_id, function(devices) {
            $scope.pending.devices = false;
            $scope.devices = devices;
        });

        RestaurantGroups.get($scope.restaurant_id, function(groups) {
            $scope.pending.groups = false;
            $scope.groups = groups;
        });

        RestaurantReviews.get($scope.restaurant_id, function(reviews) {
            $scope.pending.reviews = false;
          $scope.reviews = reviews;
        });

        $scope.shorten = function(string) {
            if (string.length > 170 && !$scope.readMore) {
                return string.slice(0, 170) + '... ' + '<a href="javascript:void(0);" ng-click="readMore=!readMore">Read More</a>';
            } else {
                return string + ' ' + '<a href="javascript:void(0);" ng-click="readMore=!readMore">Read Less</a>';
            }
        };

        $scope.mapLocation();
    }])

	.controller('HomeCtrl', [ '$scope', 'Me', 'UserOrders', 'Restaurants', function($scope, Me, UserOrders, Restaurants) {
        $scope.restaurants = [ ];
        $scope.previousOrders = [ ];

        Restaurants.get(53.3478, -6.2397, 5000, function(restaurants) {
            $scope.restaurants = restaurants;
        }, function(error) {
            console.log(error);
        });

        $scope.map = {
            center: {
                latitude: 53.3478,
                longitude: -6.2597
            },
            zoom: 14
        };

        UserOrders.get('paid', function(orders) {
            $scope.previousOrders = orders;
        })

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