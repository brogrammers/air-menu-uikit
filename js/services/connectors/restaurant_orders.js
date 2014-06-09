angular.module('air-menu-ui.services.connector.restaurant_orders', [])

    .factory('RestaurantOrders', [ 'connector', 'Order', function(connector, Order) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/orders', null, function(data) {
                    var orders = [ ];
                    angular.forEach(data['orders'], function(reviewData) {
                        orders.push(new Order(reviewData));
                    });
                    successHandler(orders);
                }, errorHandler, true);
            }
        }
    }]);