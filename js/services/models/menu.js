angular.module('air-menu-ui.services.models.menu', [])

    .factory('Menu', [ function() {
        var Menu = function(menuData) {
            angular.extend(this, menuData);
        };

        return Menu;
    }]);