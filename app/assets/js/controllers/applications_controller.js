angular.module('air-menu.controllers.applications', [])

    .controller('ApplicationsCtrl', [ '$scope', 'Applications', function($scope, Applications) {
        $scope.applications = [];
        Applications.get(function(applications) {
            $scope.applications = applications;
        })
    }]);