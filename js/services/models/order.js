angular.module('air-menu-ui.services.models.order', [])

    .factory('Order', [ function() {
        var Order = function(orderData) {
            angular.extend(this, orderData);
        };

        Order.prototype.totalCost = function() {
            var total = 0.0;
            angular.forEach(this.order_items, function(order_item) {
                total += order_item.menu_item.price;
            });
            return total;
        };

        return Order;
    }]);