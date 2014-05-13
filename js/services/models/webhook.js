angular.module('air-menu-ui.services.models.webhook', [])

    .factory('Webhook', [ function() {
        var Webhook = function(webhookData) {
            angular.extend(this, webhookData);
        };

        return Webhook;
    }]);