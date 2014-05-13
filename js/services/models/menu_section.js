angular.module('air-menu-ui.services.models.menu_section', [])

    .factory('MenuSection', [ function() {
        var MenuSection = function(menuSectionData) {
            angular.extend(this, menuSectionData);
        };

        return MenuSection;
    }]);