angular.module('air-menu.controllers.groups', [])

    .controller('GroupsCtrl', [ '$scope', '$routeParams', 'RestaurantGroups', 'Groups', function($scope, $routeParams, RestaurantGroups, Groups) {
        $scope.restaurant_id = $routeParams.id;
        $scope.groups = [ ];

        $scope.editGroup = function(group) {
            $scope.go('/m/restaurants/' + $scope.restaurant_id + '/groups/' + group.id);
        };

        $scope.addGroup = function() {
            $scope.go('/m/restaurants/' + $scope.restaurant_id + '/groups/new')
        };

        $scope.deleteGroup = function(group) {
            if (confirm('Are you sure you want to delete group "' + group.name + '"?')) {
                Groups.delete(group.id, function(group) {
                    $scope.getGroups();
                }, function(data) {

                });
            }
        };

        $scope.getGroups= function() {
            RestaurantGroups.get($scope.restaurant_id, function(groups) {
                $scope.groups = groups;
            });
        };

        $scope.getGroups();
    }]);