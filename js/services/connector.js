angular.module('air-menu-ui.services.connector', [
    'air-menu-ui.services.connector.me',
    'air-menu-ui.services.connector.docs',
    'air-menu-ui.services.connector.applications',
    'air-menu-ui.services.connector.user_orders',
    'air-menu-ui.services.connector.restaurants',
    'air-menu-ui.services.connector.company_restaurants',
    'air-menu-ui.services.connector.restaurant_devices',
    'air-menu-ui.services.connector.restaurant_groups',
    'air-menu-ui.services.connector.restaurant_reviews',
    'air-menu-ui.services.connector.restaurant_staff_members',
    'air-menu-ui.services.connector.group_staff_members',
    'air-menu-ui.services.connector.devices',
    'air-menu-ui.services.connector.groups'
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
                };
                if (method == 'POST') options.data = params || {};
                if (method == 'PUT') options.data = params || {};
                if (method == 'DELETE') options.data = params;
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
			},
            put: function(path, params, successHandler, errorHandler) {
                this.fetch('PUT', path, params, successHandler, errorHandler);
            },
            delete: function(path, successHandler, errorHandler) {
                this.fetch('DELETE', path, null, successHandler, errorHandler);
            }
		};
		return Connector;
	}]);