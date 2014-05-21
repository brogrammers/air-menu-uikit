angular.module('air-menu.controllers.restaurants', [])

    .controller('RestaurantsCtrl', [ '$scope', 'CompanyRestaurants', function($scope, CompanyRestaurants) {
        $scope.restaurants = [ ];

        CompanyRestaurants.get($scope.user.company.id, function(restaurants) {
            $scope.restaurants = restaurants;
        })

    }]);