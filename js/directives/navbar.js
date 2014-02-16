angular.module('air-menu-ui.directives.navbar', [])

	.directive('navbar', function() {
		return {
			scope: {
				session: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/navbar.html',
			controller: [ '$scope', function($scope) {
				$scope.logout = function() {
					$scope.session.destroy();
				}
			}]
		}
	});