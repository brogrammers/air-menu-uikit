angular.module('air-menu-ui.directives.login-box', [])

	.directive('loginBox', function() {
		return {
			scope: {
				handler: '=',
                registerFn: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/login-box.html',
			controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                $scope.registerMode = false;

				$scope.onSubmit = function() {
					$scope.pending = true;
					if ($scope.handler) {
						$scope.handler($scope.username, $scope.password, $scope.done);
					}
				};

                $scope.register = function() {
                    $scope.pending = true;
                    if ($scope.registerFn) {
                        $scope.registerFn($scope.username, $scope.name, $scope.phone, $scope.email, $scope.password, $scope.done);
                    }
                };

				$scope.done = function(successful) {
					$scope.pending = false;
					$scope.failure = !successful;
				};
			}]
		}
	});