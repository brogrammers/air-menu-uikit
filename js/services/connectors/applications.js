angular.module('air-menu-ui.services.connector.applications', [])

    .factory('Applications', [ 'connector', function(connector) {
        var baseUrl = '/api/oauth2/applications';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var applications = data['oauth_applications'];
                    successHandler(applications);
                }, errorHandler, true);
            }
        }
    }]);