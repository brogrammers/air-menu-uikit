angular.module('air-menu-ui.services.connector.restaurant_groups', [])

    .factory('RestaurantGroups', [ 'connector', 'Group', function(connector, Group) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/groups', null, function(data) {
                    var groups = [ ];
                    angular.forEach(data['groups'], function(groupData) {
                        groups.push(new Group(groupData));
                    });
                    successHandler(groups);
                }, errorHandler, true);
            },
            create: function(restaurant_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + restaurant_id + '/groups', params, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            }
        }
    }]);