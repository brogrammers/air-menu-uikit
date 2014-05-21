angular.module('air-menu.controllers.devices', [])

    .controller('DevicesCtrl', [ '$scope', '$routeParams', 'RestaurantDevices', 'Devices', function($scope, $routeParams, RestaurantDevices, Devices) {
        $scope.restaurant_id = $routeParams.id;
        $scope.devices = [ ];

        $scope.editDevice = function(device) {
            $scope.go('/m/restaurants/' + $scope.restaurant_id + '/devices/' + device.id);
        };

        $scope.addDevice = function() {
            $scope.go('/m/restaurants/' + $scope.restaurant_id + '/devices/new')
        };

        $scope.deleteDevice = function(device) {
            if (confirm('Are you sure you want to delete device "' + device.name + '"?')) {
                Devices.delete(device.id, function(device) {
                    $scope.getDevices();
                }, function(data) {

                });
            }
        };

        $scope.getDevices = function() {
            RestaurantDevices.get($scope.restaurant_id, function(devices) {
                $scope.devices = devices;
            });
        };

        $scope.getDevices();
    }]);