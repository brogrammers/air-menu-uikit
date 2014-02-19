angular.module('air-menu-ui.services.connector.docs', [])

	.factory('Docs', [ 'connector', function(connector) {
		var baseUrl = '/docs/';
        var versions = ['v1', 'oauth2'];
		return {
			get: function(successHandler, errorHandler) {
                var self = this;
                this.finished = 0;
                var responses = [ ];
                angular.forEach(versions, function(version) {
                    connector.get(self.versionUrl(version), null, function(data) {
                        responses.push({version: version, content: data['docs']});
                        self.finished = self.finished + 1;
                        if (self.finished == versions.length) {
                            successHandler(responses);
                        }
                    }, errorHandler, true);
                });
			},
            versionUrl: function(version) {
                return baseUrl + version + '.json';
            }
		}
	}]);