angular.module('air-menu-ui.directives.rating', [])

    .directive('ratingg', function() {
        return {
            scope: {
                stars: '='
            },
            restrict: 'E',
            templateUrl: '/air-menu/rating.html',
            controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {

                $scope.init = function() {
                    $scope.remainingStars = [ ];
                    $scope.fullStars = [ ];
                };

                $scope.$watch('stars', function(newStars) {
                    $scope.init();
                    for (var i = 0; i < parseInt(newStars); i++) { $scope.fullStars.push(i) }
                    for (var i = 0; i < 5-parseInt(newStars); i++) { $scope.remainingStars.push(i) }
                });

                $scope.init();
            }]
        }
    });