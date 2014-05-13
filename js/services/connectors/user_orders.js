angular.module('air-menu-ui.services.connector.userOrders', [])

    .factory('UserOrders', [ 'connector', 'Order', function(connector, Order) {
        var baseUrl = '/api/v1/me/orders';
        return {
            get: function(state, successHandler, errorHandler) {
                connector.get(baseUrl, {state: state}, function(data) {
                    var orders = [ ];
                    angular.forEach(data['orders'], function(order) {
                        orders.push(new Order(data['orders']));
                    });
                    successHandler(orders);
                }, errorHandler, true);
            }
        }
    }]);

