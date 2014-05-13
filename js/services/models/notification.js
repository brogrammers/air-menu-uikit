angular.module('air-menu-ui.services.models.notification', [])

    .factory('Notification', [ function() {
        var Notification = function(notificationData) {
            angular.extend(this, notificationData);
        };

        return Notification;
    }]);