angular.module('air-menu.controllers.create_restaurant', [])

    .controller('CreateRestaurantCtrl', [ '$scope', '$modalInstance', 'CompanyRestaurants', 'company', function($scope, $modalInstance, CompanyRestaurants, company) {
        $scope.restaurant = { latitude:53.3478, longitude:-6.2597 };

        $scope.ok = function () {
            CompanyRestaurants.create(company.id, $scope.restaurant, function(restaurant) {
                $modalInstance.close('ok');
            }, function() {
                console.log('error')
            })
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.map = {
            center: {
                latitude: 53.3478,
                longitude: -6.2597
            },
            zoom: 14
        };

        $scope.markerOptions = {
            draggable: true
        };

        $scope.events = {
            dragend: function(a, b, c, d) {
                $scope.restaurant.latitude = c[0].latLng.lat();
                $scope.restaurant.longitude= c[0].latLng.lng();
            }
        }

    }]);