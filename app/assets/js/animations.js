'use strict';

angular.module('air-menu.animations', [])

    .animation('.reveal-animation', function() {
        return {
            enter: function(element, done) {
                angular.element(element).fadeIn(2400, function() {
                    done();
                })
            },
            leave: function(element, done) {
                angular.element(element).fadeOut(2400, function() {
                    done()
                })
            }
        }
    });