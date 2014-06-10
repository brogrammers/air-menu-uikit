angular.module('air-menu.controllers.restaurants', [])

    .controller('RestaurantsCtrl', [ '$scope', 'CompanyRestaurants', '$modal', function($scope, CompanyRestaurants, $modal) {
        $scope.restaurants = [ ];

        $scope.getRestaurants = function() {
            CompanyRestaurants.get($scope.user.company.id, function(restaurants) {
                $scope.restaurants = restaurants;
            });
        };

        $scope.addRestaurant = function() {
            var modalInstance = $modal.open({
                templateUrl: '/assets/pages/create_restaurant.html',
                controller: 'CreateRestaurantCtrl',
                resolve: {
                    company: function() {
                        return $scope.user.company;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.getRestaurants();
            }, function () {

            });
        };

        $scope.getRestaurants();

    }]);