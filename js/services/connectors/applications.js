angular.module('air-menu-ui.services.connector.applications', [])

    .factory('Applications', [ 'connector', function(connector) {
        var baseUrl = '/api/oauth2/applications';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var applications = data['oauth_applications'];
                    successHandler(applications);
                }, errorHandler);
            },
            create: function(name, redirect_uri, successHandler, errorHandler) {
                connector.post(baseUrl, {'name': name, 'redirect_uri': redirect_uri}, function(data) {
                    var application = data['oauth_application'];
                    successHandler(application)
                }, errorHandler);
            }
        }
    }]);