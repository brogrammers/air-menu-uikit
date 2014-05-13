angular.module('air-menu-ui.services.models.review', [])

    .factory('Review', [ function() {
        var Review = function(reviewData) {
            angular.extend(this, reviewData);
        };

        return Review;
    }]);