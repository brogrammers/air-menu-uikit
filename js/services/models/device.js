angular.module('air-menu-ui.services.models.device', [])

    .factory('Device', [ function() {
        var Device = function(deviceData) {
            angular.extend(this, deviceData);
        };

        return Device;
    }]);