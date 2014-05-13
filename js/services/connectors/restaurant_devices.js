angular.module('air-menu-ui.services.connector.restaurant_devices', [])

    .factory('RestaurantDevices', [ 'connector', 'Device', function(connector, Device) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/devices', null, function(data) {
                    var devices = [ ];
                    angular.forEach(data['devices'], function(deviceData) {
                        devices.push(new Device(deviceData));
                    });
                    successHandler(devices);
                }, errorHandler, true);
            }
        }
    }]);