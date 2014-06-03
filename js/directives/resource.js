angular.module('air-menu-ui.directives.resource', [])

	.directive('resource', function() {
		return {
			scope: {
				resource: '=',
                handler: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/resource.html',
			controller: [ '$scope', function($scope) {
                $scope.select = function(selectedMethod) {
//                    angular.forEach($scope.resource.methods, function(method) {
//                        if (selectedMethod != method) method.selected = false;
//                    });
                    selectedMethod.selected = !selectedMethod.selected;
                }
			}]
		}
	});