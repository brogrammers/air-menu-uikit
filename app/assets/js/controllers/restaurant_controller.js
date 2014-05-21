angular.module('air-menu.controllers.restaurant', [])

    .controller('RestaurantCtrl', [ '$scope', 'Restaurants', 'RestaurantDevices', 'RestaurantGroups', 'RestaurantReviews', '$routeParams', function($scope, Restaurants, RestaurantDevices, RestaurantGroups, RestaurantReviews, $routeParams) {
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