angular.module('air-menu-ui.services.models.user', [])

    .factory('User', [ 'Scope', function(Scope) {
        var User = function(userData) {
            angular.extend(this, userData);
            this.scope = new Scope(this.scopes);
        };

        User.prototype.isDeveloper = function() {
            return this.scope.isDeveloper();
        };

        User.prototype.isAdmin = function() {
            return this.scope.isAdmin();
        };

        User.prototype.isOwner = function() {
            return this.scope.isOwner();
        };
        return User;
    }]);