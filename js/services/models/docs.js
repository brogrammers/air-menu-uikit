angular.module('air-menu-ui.services.models.docs', [])

	.factory('Docs', [ 'connector', function(connector) {
		var baseUrl = '/docs.json';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, successHandler, errorHandler, true);
			}
		}
	}]);