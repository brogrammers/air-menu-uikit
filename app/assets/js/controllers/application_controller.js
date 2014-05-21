angular.module('air-menu.controllers.application', [])

    .controller('ApplicationCtrl', [ '$scope', 'Applications', '$location', function($scope, Applications, $location) {
        $scope.submit = function() {
            Applications.create($scope.name, $scope.redirect_uri, function(application) {
                $location.path('/developer/applications');
            });
        };
    }])