angular.module('air-menu.controllers.create_company', [])

    .controller('CreateCompanyCtrl', [ '$scope', '$modalInstance', 'Companies', function($scope, $modalInstance, Companies) {
        $scope.company = { };

        $scope.ok = function () {
            Companies.create($scope.company, function(company) {
                $modalInstance.close('ok');
            }, function() {
                console.log('error');
            })
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);