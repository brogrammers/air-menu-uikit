angular.module('air-menu-ui.services.models.order_item', [])

    .factory('OrderItem', [ function() {
        var OrderItem = function(orderItemData) {
            angular.extend(this, orderItemData);
        };

        return OrderItem;
    }]);