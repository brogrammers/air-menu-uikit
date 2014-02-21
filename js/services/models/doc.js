angular.module('air-menu-ui.services.models.doc', [])

    .factory('Doc', [ 'Scope', function(Scope) {
        var Doc = function(docData) {
            angular.extend(this, docData);
            this.parseScopes();
        };

        Doc.prototype.parseScopes = function() {
            angular.forEach(this.resources, function(resource) {
                angular.forEach(resource.methods, function(method) {
                    method.scope = Scope.fromString(method.full_description);
                    angular.forEach(method.params, function(parameter) {
                        parameter.scope = Scope.fromString(parameter.description);
                    });
                });
            });
        };

        return Doc;
    }]);