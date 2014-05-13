angular.module('air-menu-ui.services.models.opening_hour', [])

    .factory('OpeningHour', [ function() {
        var OpeningHour = function(openingHour) {
            angular.extend(this, openingHour);
        };

        return OpeningHour;
    }]);