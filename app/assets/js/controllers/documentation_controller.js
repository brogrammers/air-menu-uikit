angular.module('air-menu.controllers.documentation', [])

    .controller('DocumentationCtrl', [ '$scope', 'Docs', '$location', function($scope, Docs, $location) {
        $scope.fetch = function() {
            Docs.get(function(data) {
                $scope.docs = data;
            });
        };

        $scope.handler = function(tab) {
            $scope.currentTab = tab;
            if ($scope.docs) {
                angular.forEach($scope.docs, function(doc) {
                    if (doc.version == tab.otitle) {
                        $scope.setBase(doc.content);
                    }
                });
            }
        };

        $scope.resourceClick = function(resource) {
            $location.path('/documentation/' + resource.version + '/' + resource.name);
        };

        $scope.setBase = function(context) {
            $scope.name = context.name;
            $scope.info = context.info;
            $scope.path = context.api_url;
            $scope.baseUrl = window.API_BASE_URL;
        };

        $scope.scrollTo = function(selector) {
            $('html, body').animate({
                scrollTop: $(selector).offset().top
            }, 800);
        };

        $scope.fetch();
    }]);