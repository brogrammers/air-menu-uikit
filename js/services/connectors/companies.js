angular.module('air-menu-ui.services.connector.companies', [])

    .factory('Companies', [ 'connector', function(connector) {
        var baseUrl = '/api/v1/companies';
        return {
            create: function(params, successHandler, errorHandler) {
                connector.post(baseUrl, params, function(data) {
                    var company = data['company'];
                    successHandler(company)
                }, errorHandler);
            }
        }
    }]);