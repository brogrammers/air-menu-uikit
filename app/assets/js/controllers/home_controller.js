angular.module('air-menu.controllers.home', [])

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

    }]);