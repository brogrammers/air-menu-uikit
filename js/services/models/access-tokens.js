angular.module('air-menu-ui.services.models.access-tokens', [])

	.factory('AccessTokens', [ 'connector', function(connector) {
		var baseUrl = '/api/oauth2/access_tokens';
		return {
			create: function(params, successHandler, errorHandler) {
				connector.post(baseUrl, params,  successHandler, errorHandler);
			}
		}
	}]);