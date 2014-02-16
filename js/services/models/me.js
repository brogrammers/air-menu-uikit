angular.module('air-menu-ui.services.models.me', [])

	.factory('Me', [ 'connector', function(connector) {
		var baseUrl = '/api/v1/me';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, successHandler, errorHandler, true);
			}
		}
	}]);