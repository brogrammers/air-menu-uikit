angular.module('air-menu-ui.services.connector.group_staff_members', [])

    .factory('GroupStaffMembers', [ 'connector', 'StaffMember', function(connector, StaffMember) {
        var baseUrl = '/api/v1/groups/';
        return {
            get: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + id + '/staff_members', null, function(data) {
                    var staff_members = [ ];
                    angular.forEach(data['staff_members'], function(staffMemberData) {
                        staff_members.push(new StaffMember(staffMemberData));
                    });
                    successHandler(staff_members);
                }, errorHandler, true);
            },
            create: function(id, params, successHandler, errorHandler) {
                connector.post(baseUrl + id + '/staff_members', params, function(data) {
                    successHandler(new StaffMember(data['staff_member']));
                }, errorHandler, true);
            }
        }
    }]);