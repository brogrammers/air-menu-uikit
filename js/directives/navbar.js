angular.module('air-menu-ui.directives.navbar', [])

	.directive('navbar', function() {
		return {
			restrict: 'E',
			templateUrl: '/air-menu/navbar.html',
			controller: [ '$scope', function($scope) {
                $scope.$on('air-menu-ui.event.navbar.user', function(event, user) {
                    $scope.user = user;
                });
			}]
		}
	});