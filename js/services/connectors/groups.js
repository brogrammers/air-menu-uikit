angular.module('air-menu-ui.services.connector.groups', [])

    .factory('Groups', [ 'connector', 'Group', function(connector, Group) {
        var baseUrl = '/api/v1/groups';
        return {
            show: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + id, null, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            },
            update: function(id, params, successHandler, errorHandler) {
                connector.put(baseUrl + '/' + id, params, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            },
            delete: function(id, successHandler, errorHandler) {
                connector.delete(baseUrl + '/' + id, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            }
        }
    }]);