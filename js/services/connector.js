angular.module('air-menu-ui.services.connector', [])

	.factory('connector', [ '$rootScope', '$http', 'store', function($rootScope, $http, store) {
		var Connector = {
			fetch: function(method, path, params, data, successHandler, errorHandler, authorized) {
				if (authorized && !store.valid('access_token')) return;
				var token = store.valid('access_token') ? store.get('access_token').token : '';
				$http({
					method: method,
					url: path,
					params: params || {},
					data: data || {},
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + token
					}
				})
				.success(function(data, status, headers, config) {
					if (successHandler) successHandler(data, status);
				})
				.error(function(data, status, headers, config) {
					if (status == 401) $rootScope.$broadcast('air-menu-ui.event.unauthorized', data);
					if (errorHandler) errorHandler(data, status);
				})
			},
			get: function(path, params, successHandler, errorHandler, authorized) {
				this.fetch('GET', path, params, null, successHandler, errorHandler, authorized);
			},
			post: function(path, data, successHandler, errorHandler, authorized) {
				this.fetch('POST', path, data, null, successHandler, errorHandler, authorized);
			}
		};
		return Connector;
	}]);