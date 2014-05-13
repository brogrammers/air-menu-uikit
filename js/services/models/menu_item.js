angular.module('air-menu-ui.services.models.menu_item', [])

    .factory('MenuItem', [ function() {
        var MenuItem = function(menuItemData) {
            angular.extend(this, menuItemData);
        };

        return MenuItem;
    }]);