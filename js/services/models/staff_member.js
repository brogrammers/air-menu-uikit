angular.module('air-menu-ui.services.models.staff_member', [])

    .factory('StaffMember', [ function() {
        var StaffMember = function(staffMemberData) {
            angular.extend(this, staffMemberData);
        };

        return StaffMember;
    }]);