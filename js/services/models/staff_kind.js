angular.module('air-menu-ui.services.models.staff_kind', [])

    .factory('StaffKind', [ function() {
        var StaffKind = function(staffKindData) {
            angular.extend(this, staffKindData);
        };

        return StaffKind;
    }]);