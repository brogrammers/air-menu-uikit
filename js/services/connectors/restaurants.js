angular.module('air-menu-ui.services.connector.restaurants', [])

    .factory('Restaurants', [ 'connector', 'Restaurant', function(connector, Restaurant) {
        var baseUrl = '/api/v1/restaurants';
        return {
            get: function(latitude, longitude, offset, successHandler, errorHandler) {
                connector.get(baseUrl, {latitude:latitude, longitude:longitude, offset:offset}, function(data) {
                    var restaurants = [ ];
                    angular.forEach(data['restaurants'], function(restaurantData) {
                        restaurants.push(new Restaurant(restaurantData));
                    });
                    successHandler(restaurants);
                }, errorHandler, true);
            },
            show: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + id, null, function(data) {
                    successHandler(new Restaurant(data['restaurant']))
                }, errorHandler, true);
            }
        }
    }]);