angular.module('air-menu-ui.services.connector.restaurant_staff_members', [])

    .factory('RestaurantStaffMembers', [ 'connector', 'StaffMember', function(connector, StaffMember) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/staff_members', null, function(data) {
                    var staff_members = [ ];
                    angular.forEach(data['staff_members'], function(staffMemberData) {
                        staff_members.push(new StaffMember(staffMemberData));
                    });
                    successHandler(staff_members);
                }, errorHandler, true);
            },
            create: function(restaurant_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + restaurant_id + '/staff_members', params, function(data) {
                    successHandler(new StaffMember(data['staff_member']));
                }, errorHandler, true);
            }
        }
    }]);