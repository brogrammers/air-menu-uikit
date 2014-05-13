angular.module('air-menu-ui.services.models.group', [])

    .factory('Group', [ function() {
        var Group = function(groupData) {
            angular.extend(this, groupData);
        };

        return Group;
    }]);