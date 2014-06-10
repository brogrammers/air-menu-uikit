angular.module('air-menu-ui.services.connector.company_restaurants', [])

    .factory('CompanyRestaurants', [ 'connector', 'Restaurant', function(connector, Restaurant) {
        var baseUrl = '/api/v1/companies/';
        return {
            get: function(company_id, successHandler, errorHandler) {
                connector.get(baseUrl + company_id + '/restaurants', null, function(data) {
                    var restaurants = [ ];
                    angular.forEach(data['restaurants'], function(restaurantData) {
                        restaurants.push(new Restaurant(restaurantData));
                    });
                    successHandler(restaurants);
                }, errorHandler, true);
            },
            create: function(company_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + company_id + '/restaurants', params, function(restaurantData) {
                    successHandler(new Restaurant(restaurantData));
                }, errorHandler, true);
            }
        }
    }]);