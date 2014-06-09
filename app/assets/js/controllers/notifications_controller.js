angular.module('air-menu.controllers.notifications', [])

    .controller('NotificationsCtrl', [ '$scope', 'UserNotifications', function($scope, UserNotifications) {
        $scope.notifications = [ ];

        UserNotifications.get(function(notifications) {
            $scope.notifications = notifications
        })

    }]);