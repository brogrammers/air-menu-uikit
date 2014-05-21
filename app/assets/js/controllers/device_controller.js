angular.module('air-menu.controllers.device', [])

    .controller('DeviceCtrl', [ '$scope', '$routeParams', 'RestaurantDevices', 'Devices', function($scope, $routeParams, RestaurantDevices, Devices) {
        $scope.restaurant_id = $routeParams.id;
        $scope.device_id = $routeParams.device_id;
        $scope.device = { platform: 'ios' };
        $scope.pending = true;

        if ($scope.device_id) {
            $scope.editMode = true;
            Devices.show($scope.device_id, function (device) {
                $scope.device = device;
                $scope.pending = false;
            }, function(data) {
                $scope.pending = false;
            });
        } else {
            $scope.editMode = false;
        }

        $scope.submit = function() {
            if ($scope.editMode) {
                $scope.updateDevice();
            } else {
                $scope.createDevice();
            }
        };

        $scope.createDevice = function() {
            $scope.pending = true;
            RestaurantDevices.create($scope.restaurant_id, $scope.device, function(device) {
                $scope.pending = false;
                $scope.device = device;
                history.back();
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.updateDevice = function() {
            $scope.pending = true;
            Devices.update($scope.device_id, $scope.device, function(device) {
                $scope.pending = false;
                $scope.device = device;
                history.back();
            }, function(data) {
                $scope.pending = false;
            });
        };

    }]);