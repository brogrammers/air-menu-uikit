angular.module('air-menu-ui.services.connector', [])

	.factory('connector', [ '$rootScope', '$http', function($rootScope, $http) {
		var Connector = {
			fetch: function(method, path, params, data, successHandler, errorHandler) {
				$http({
					method: method,
					url: path,
					params: params || {},
					data: data || {}
				})
				.success(function(data, status, headers, config) {
					if (successHandler) successHandler(data, status);
				})
				.error(function(data, status, headers, config) {
					if (status == 401) $rootScope.$broadcast('air-menu-ui.event.unauthorized', data);
					if (errorHandler) errorHandler(data, status);
				})
			},
			get: function(path, params, successHandler, errorHandler) {
				this.fetch('GET', path, params, null, successHandler, errorHandler);
			},
			post: function(path, data, successHandler, errorHandler) {
				this.fetch('POST', path, data, null, successHandler, errorHandler);
			}
		};
		return Connector;
	}]);