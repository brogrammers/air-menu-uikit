angular.module('air-menu-ui.services.connector.me', [])

	.factory('Me', [ 'connector', 'User', function(connector, User) {
		var baseUrl = '/api/v1/me';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, function(data) {
                    var user = new User(data['me']);
                    successHandler(user);
                }, errorHandler, true);
			}
		}
	}]);

