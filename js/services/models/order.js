angular.module('air-menu-ui.services.models.order', [])

    .factory('Order', [ function() {
        var Order = function(orderData) {
            angular.extend(this, orderData);
        };

        return Order;
    }]);