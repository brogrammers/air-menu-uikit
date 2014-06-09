angular.module('air-menu-ui.services.connector.user_credit_cards', [])

    .factory('UserCreditCards', [ 'connector', 'CreditCard', function(connector, CreditCard) {
        var baseUrl = '/api/v1/me/credit_cards';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var credit_cards = [ ];
                    angular.forEach(data['credit_cards'], function(orderData) {
                        credit_cards.push(new CreditCard(orderData));
                    });
                    successHandler(credit_cards);
                }, errorHandler, true);
            }
        }
    }]);