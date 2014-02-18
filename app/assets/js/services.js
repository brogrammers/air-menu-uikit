'use strict';

angular.module('air-menu.services', [])

    .factory('login', [ '$http', function($http) {
        var loginHandler = function(username, password, successHandler, errorHandler) {
            $http({
                method: 'POST',
                url: '/login',
                data: {username: username, password: password},
                headers: {
                    'X-CSRF-Token': window.CSRF_TOKEN
                }
            })
            .success(function() {
                if (successHandler) successHandler();
            })
            .error(function() {
                if (errorHandler) errorHandler();
            });
        };
        return loginHandler;
    }]);
