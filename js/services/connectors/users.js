angular.module('air-menu-ui.services.connector.users', [])

    .factory('Users', [ 'connector', 'User', function(connector, User) {
        var baseUrl = '/api/v1/users';
        return {
            create: function(params, successHandler, errorHandler) {
                connector.post(baseUrl, params, function(data) {
                    var user = new User(data['user']);
                    successHandler(user);
                }, errorHandler, true);
            }
        }
    }]);

