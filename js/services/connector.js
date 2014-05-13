angular.module('air-menu-ui.services.connector', [
        'air-menu-ui.services.connector.me',
        'air-menu-ui.services.connector.docs',
        'air-menu-ui.services.connector.applications',
        'air-menu-ui.services.connector.userOrders'
    ])

	.factory('connector', [ '$rootScope', '$http', function($rootScope, $http) {
		var Connector = {
			fetch: function(method, path, params, successHandler, errorHandler) {
                var options = {
                    method: method,
                    url: path,
                    headers: {
                        'X-CSRF-Token': window.CSRF_TOKEN
                    }
                }
                if (method == 'POST') options.data = params || {};
                if (method == 'GET') options.params = params || {};
				$http(options)
				.success(function(data, status, headers, config) {
					if (successHandler) successHandler(data, status);
				})
				.error(function(data, status, headers, config) {
					if (status == 401) $rootScope.$broadcast('air-menu-ui.event.unauthorized', data);
					if (errorHandler) errorHandler(data, status);
				})
			},
			get: function(path, params, successHandler, errorHandler) {
				this.fetch('GET', path, params, successHandler, errorHandler);
			},
			post: function(path, params, successHandler, errorHandler) {
				this.fetch('POST', path, params, successHandler, errorHandler);
			}
		};
		return Connector;
	}]);