angular.module('air-menu.controllers.login', [])

    .controller('LoginCtrl', [ '$scope', '$rootScope', '$location', 'login', 'Users', function($scope, $rootScope, $location, login, Users) {
        if ($scope.user) $location.path('/');
        $scope.handler = function(username, password, done) {
            login(username, password, function() {
                done(true);
                location.replace('/');
            }, function() {
                done(false);
            })
        }

        $scope.registerHandler = function(username, name, phone, email, password, done) {
            Users.create({username:username, name:name, phone:phone, email:email, password:password}, function(user) {
                done(true);
                location.replace('/');
            }, function() {
                done(false);
            })
        }
    }])