
/*!
 * air-menu-ui v0.0.1 by tsov
 * Copyright 2014 Air-Menu
 */
angular.module('air-menu-ui.animations', []);
'use strict';

angular.module('air-menu-ui', [
	'air-menu-ui.filters',
	'air-menu-ui.services',
	'air-menu-ui.directives',
	'air-menu-ui.controllers',
	'air-menu-ui.templates',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'breakpointApp'
]);
angular.module('air-menu-ui.controllers', []);
angular.module('air-menu-ui.directives', [
	'air-menu-ui.directives.login-box',
	'air-menu-ui.directives.navbar',
	'air-menu-ui.directives.resource'
]);
angular.module('air-menu-ui.directives.login-box', [])

	.directive('loginBox', function() {
		return {
			scope: {
				handler: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/login-box.html',
			controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
				$scope.onSubmit = function() {
					$scope.pending = true;
					if ($scope.handler) {
						$scope.handler($scope.username, $scope.password, $scope.done);
					}
				};

				$scope.done = function(successful) {
					$scope.pending = false;
					$scope.failure = !successful;
				};
			}]
		}
	});
angular.module('air-menu-ui.directives.navbar', [])

	.directive('navbar', function() {
		return {
			restrict: 'E',
			templateUrl: '/air-menu/navbar.html',
			controller: [ '$scope', function($scope) {
                $scope.$on('air-menu-ui.event.navbar.user', function(event, user) {
                    $scope.user = user;
                });
			}]
		}
	});
angular.module('air-menu-ui.directives.resource', [])

	.directive('resource', function() {
		return {
			scope: {
				resource: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/resource.html',
			controller: [ '$scope', function($scope) {

			}]
		}
	});
angular.module('air-menu-ui.filters', []);

angular.module('air-menu-ui.services', [
	'air-menu-ui.services.connector',
	'air-menu-ui.services.store',
	'air-menu-ui.services.models'
]);

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
angular.module('air-menu-ui.services.models', [
	'air-menu-ui.services.models.me',
	'air-menu-ui.services.models.docs'
]);
angular.module('air-menu-ui.services.models.docs', [])

	.factory('Docs', [ 'connector', function(connector) {
		var baseUrl = '/docs.json';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, successHandler, errorHandler, true);
			}
		}
	}]);
angular.module('air-menu-ui.services.models.me', [])

	.factory('Me', [ 'connector', function(connector) {
		var baseUrl = '/api/v1/me';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, successHandler, errorHandler, true);
			}
		}
	}]);
angular.module('air-menu-ui.services.store', [])

	.factory('store', function() {
		var Store = {
			set: function(name, value) {
				if (value) localStorage[name] = btoa(JSON.stringify(value));
			},
			get: function(name) {
				return JSON.parse(atob(localStorage[name]));
			},
			has: function(name) {
				return !!localStorage[name];
			},
			empty: function(name) {
				localStorage[name] = null;
			},
			valid: function(name, value) {
				var valid;
				try {
					if (value) valid = JSON.parse(atob(value));
					else valid = JSON.parse(atob(localStorage[name]));
				} catch(err) {
					valid = false;
				}
				return valid
			}
		};
		return Store;
	});
angular.module('air-menu-ui.templates', ['/air-menu/login-box.html', '/air-menu/navbar.html', '/air-menu/resource.html']);

angular.module("/air-menu/login-box.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/login-box.html",
    "<form role=\"form\" class=\"login-box\" ng-submit=\"onSubmit()\">\n" +
    "	<div ng-if=\"failure\" class=\"alert alert-danger\">\n" +
    "		Oh no! You username/password combination seems to fail!\n" +
    "	</div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n" +
    "			<input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"Username\" ng-model=\"username\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-lock\"></i></span>\n" +
    "			<input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"password\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"checkbox\">\n" +
    "		<label>\n" +
    "			<input type=\"checkbox\" /> Remember Me\n" +
    "		</label>\n" +
    "	</div>\n" +
    "	<button type=\"submit\" class=\"btn btn-primary btn-block {{pending || !username || !password ? 'disabled' : ''}}\" {{pending ? 'disabled' : ''}}>SIGN IN</button>\n" +
    "</form>");
}]);

angular.module("/air-menu/navbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/navbar.html",
    "<nav class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "	<div class=\"container-fluid\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#menu\">\n" +
    "				<span class=\"sr-only\">Toggle navigation</span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "			</button>\n" +
    "			<a href=\"#\" class=\"navbar-brand\">AirMenu</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"collapse navbar-collapse\" id=\"menu\">\n" +
    "            <a ng-if=\"!user\" href=\"#/login\" class=\"btn btn-default navbar-right navbar-btn\">Login</a>\n" +
    "			<ul ng-if=\"user\" class=\"nav navbar-nav navbar-right\">\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-user\"></i> {{user.name}} <b class=\"caret\"></b></a>\n" +
    "					<ul class=\"dropdown-menu\">\n" +
    "						<li><a href=\"#\">Profile</a></li>\n" +
    "						<li><a href=\"#/documentation\">API Documentation</a></li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li><a href=\"/logout\">Logout</a></li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</nav>");
}]);

angular.module("/air-menu/resource.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/resource.html",
    "<div class=\"container\">\n" +
    "	<h1>{{resource.name}}</h1>\n" +
    "	<p class=\"lead\">{{resource.short_description}}</p>\n" +
    "	<div class=\"resource\" ng-repeat=\"method in resource.methods\">\n" +
    "		<div ng-repeat=\"api in method.apis\">\n" +
    "			<div class=\"method {{api.http_method}}\">{{api.http_method}}</div>\n" +
    "			<div class=\"path\">{{api.api_url}}</div>\n" +
    "		</div>\n" +
    "		<p ng-bind-html=\"method.full_description\"></p>\n" +
    "		<strong>Formats:</strong> <span class=\"label label-default\" ng-repeat=\"format in method.formats\"> {{format}}</span>\n" +
    "	</div>\n" +
    "</div>");
}]);
