angular.module('air-menu-ui.services.models.restaurant', [])

    .factory('Restaurant', [ function() {
        var Restaurant = function(restaurantData) {
            angular.extend(this, restaurantData);
        };

        return Restaurant;
    }]);