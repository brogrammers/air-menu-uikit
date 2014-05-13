angular.module('air-menu-ui.services.models.order', [])

    .factory('Order', [ 'Scope', function(Scope) {
        var Order = function(orderData) {
            angular.extend(this, orderData);
        };

        return Order;
    }]);