angular.module('air-menu-ui.services.models.payment', [])

    .factory('Payment', [ function() {
        var Payment = function(paymentData) {
            angular.extend(this, paymentData);
        };

        return Payment;
    }]);