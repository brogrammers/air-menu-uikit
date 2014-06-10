angular.module('air-menu.controllers.restaurant', [])

    .controller('RestaurantCtrl', [ '$scope', 'Restaurants', 'RestaurantDevices', 'RestaurantGroups', 'RestaurantReviews', 'RestaurantStaffMembers', 'RestaurantOrders', '$routeParams', function($scope, Restaurants, RestaurantDevices, RestaurantGroups, RestaurantReviews, RestaurantStaffMembers, RestaurantOrders, $routeParams) {
        $scope.restaurant_id = $routeParams.id;
        $scope.restaurant = { description: '',location: { latitude: 53.3478, longitude: -6.2597 } };
        $scope.pending = { };
        $scope.pending.devices = true;
        $scope.pending.groups = true;
        $scope.pending.reviews = true;
        $scope.pending.staff_members = true;
        $scope.pending.orders = true;
        $scope.devices = [ ];
        $scope.groups = [ ];
        $scope.reviews = [ ];
        $scope.orders = [ ];
        $scope.staff_members = [ ];
        $scope.deviceEditMode = false;
        $scope.groupEditMode = false;
        $scope.staffMemberEditMode = false;
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

        RestaurantStaffMembers.get($scope.restaurant_id, function(staff_members) {
            $scope.pending.staff_members = false;
            $scope.staff_members = staff_members;
        });

        RestaurantOrders.get($scope.restaurant_id, function(orders) {
            $scope.pending.orders = false;
            $scope.orders = orders;
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