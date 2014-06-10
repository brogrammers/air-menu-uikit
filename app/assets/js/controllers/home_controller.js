angular.module('air-menu.controllers.home', [])

    .controller('HomeCtrl', [ '$scope', 'Me', 'UserOrders', 'UserCreditCards', 'Restaurants', '$modal', function($scope, Me, UserOrders, UserCreditCards, Restaurants, $modal) {
        $scope.restaurants = [ ];
        $scope.previousOrders = [ ];
        $scope.pending = {previousOrders: true, credit_cards: true};

        Restaurants.get(53.3478, -6.2397, 5000, function(restaurants) {
            $scope.restaurants = restaurants;
        }, function(error) {
            console.log(error);
        });

        $scope.map = {
            center: {
                latitude: 53.3478,
                longitude: -6.2597
            },
            zoom: 14
        };

        UserOrders.get('paid', function(orders) {
            $scope.pending.previousOrders = false;
            $scope.previousOrders = orders;
        });

        UserCreditCards.get(function(credit_cards) {
            $scope.pending.credit_cards = false;
            $scope.credit_cards = credit_cards;
        })

        $scope.openCompany = function() {
            var modalInstance = $modal.open({
                templateUrl: '/assets/pages/create_company.html',
                controller: 'CreateCompanyCtrl'
            });

            modalInstance.result.then(function () {
                $scope.getCurrentUser();
            }, function () {

            });
        };

    }]);