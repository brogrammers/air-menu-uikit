angular.module('air-menu-ui.services.connector.restaurant_reviews', [])

    .factory('RestaurantReviews', [ 'connector', 'Review', function(connector, Review) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/reviews', null, function(data) {
                    var reviews = [ ];
                    angular.forEach(data['reviews'], function(reviewData) {
                        reviews.push(new Review(reviewData));
                    });
                    successHandler(reviews);
                }, errorHandler, true);
            }
        }
    }]);