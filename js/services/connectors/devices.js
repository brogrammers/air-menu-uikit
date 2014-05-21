angular.module('air-menu-ui.services.connector.devices', [])

    .factory('Devices', [ 'connector', 'Device', function(connector, Device) {
        var baseUrl = '/api/v1/devices';
        return {
            show: function(device_id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + device_id, null, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            },
            update: function(id, params, successHandler, errorHandler) {
                connector.put(baseUrl + '/' + id, params, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            },
            delete: function(id, successHandler, errorHandler) {
                connector.delete(baseUrl + '/' + id, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            }
        }
    }]);