angular.module('air-menu-ui.services.models.scope', [])

    .factory('Scope', function() {
        var Scope = function(scopes) {
            this.scopes = scopes;
        };

        Scope.prototype.has = function(scopeName) {
            for (var scope in this.scopes) {
                if (this.scopes[scope] == scopeName) return true;
            }
            return false;
        };

        Scope.prototype.isAdmin = function() {
            return this.has('admin');
        };

        Scope.prototype.isDeveloper = function() {
            return this.has('developer');
        };

        Scope.prototype.isOwner = function() {
            return this.has('owner');
        };

        Scope.prototype.isEmpty = function() {
            return this.scopes.length == 0;
        };

        Scope.fromString = function(string) {
            var regex = /\|\|(.*)\|\|/g;
            var matches = regex.exec(string);
            var scopes;
            if (matches && matches[1]) {
                scopes = matches[1].split(' ');
            } else {
                scopes = [];
            }
            return new Scope(scopes);
        };

        return Scope;
    });