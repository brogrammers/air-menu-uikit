angular.module('air-menu-ui.services.connector.user_notifications', [])

    .factory('UserNotifications', [ 'connector', 'Notification', function(connector, Notification) {
        var baseUrl = '/api/v1/me/notifications';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var notifications = [ ];
                    angular.forEach(data['notifications'], function(notificationData) {
                         notifications.push(new Notification(notificationData));
                    });
                    successHandler(notifications);
                }, errorHandler, true);
            }
        }
    }]);