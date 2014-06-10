angular.module('air-menu.controllers.group', [])

    .controller('GroupCtrl', [ '$scope', '$routeParams', 'RestaurantGroups', 'RestaurantStaffMembers', 'RestaurantDevices', 'GroupStaffMembers', 'Groups', function($scope, $routeParams, RestaurantGroups, RestaurantStaffMembers, RestaurantDevices, GroupStaffMembers, Groups) {
        $scope.restaurant_id = $routeParams.id;
        $scope.group_id = $routeParams.group_id;
        $scope.staff_members = [ ];
        $scope.devices = [ ];
        $scope.groups = { };

        $scope.submit = function() {
            console.log('sdh');
            if ($scope.editMode) {
                $scope.updateGroup();
            } else {
                $scope.createGroup();
            }
        };

        $scope.enable = function(staff_member) {
            staff_member.enabled = !staff_member.enabled;
        };

        $scope.getGroup = function() {
            $scope.pending = true;
            Groups.show($scope.group_id, function (group) {
                $scope.group = group;
                $scope.pending = false;
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.getRestaurantStaffMembers = function() {
            $scope.pending = true;
            RestaurantStaffMembers.get($scope.restaurant_id, function (staff_members) {
                $scope.staff_members = staff_members;
                $scope.getGroupStaffMembers();
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.getRestaurantDevices = function() {
            $scope.pending = true;
            RestaurantDevices.get($scope.restaurant_id, function (devices) {
                $scope.devices = devices;
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.getGroupStaffMembers = function() {
            if ($scope.group_id) {
                $scope.pending = true;
                GroupStaffMembers.get($scope.group_id, function (staff_members) {
                    angular.forEach(staff_members, function(group_staff_member) {
                        angular.forEach($scope.staff_members, function(staff_member) {
                            if (group_staff_member.id == staff_member.id) staff_member.enabled = true
                        })
                    });
                    $scope.pending = false;
                }, function(data) {
                    $scope.pending = false;
                });
            }
        };

        $scope.createGroup = function() {
            $scope.pending = true;
            RestaurantGroups.create($scope.restaurant_id, $scope.group, function(group) {
                $scope.pending = false;
                $scope.group = group;
                history.back();
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.updateGroup = function() {
            $scope.pending = true;
            $scope.groupModel = { };
            angular.extend($scope.groupModel, $scope.group);
            $scope.groupModel.device_id = $scope.group.device.id;
            $scope.groupModel.staff_members = $scope.collectSelectedStaffMember();
            Groups.update($scope.group_id, $scope.groupModel, function(group) {
                $scope.pending = false;
                $scope.group = group;
                history.back();
            }, function(data) {
                $scope.pending = false;
            });
        };

        $scope.collectSelectedStaffMember = function() {
            var result = '';
            angular.forEach($scope.staff_members, function(staff_member) {
                if (staff_member.enabled) result += staff_member.id + ' '
            });
            return result.substring(0, result.length - 1);
        };

        if ($scope.group_id) {
            $scope.editMode = true;
            $scope.getGroup();

        } else {
            $scope.editMode = false;
        }

        $scope.getBack = function() {
            console.log('udgsf');
            history.back();
        }
        $scope.getRestaurantStaffMembers();
        $scope.getRestaurantDevices();

    }]);