angular.module('air-menu-ui.services.models.credit_card', [])

    .factory('CreditCard', [ function() {
        var CreditCard = function(creditCardData) {
            angular.extend(this, creditCardData);
        };

        return CreditCard;
    }]);