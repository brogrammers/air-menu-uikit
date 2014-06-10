
/*!
 * air-menu-ui v0.0.1 by tsov
 * Copyright 2014 Air-Menu
 */
angular.module('air-menu-ui.animations', []);
'use strict';

angular.module('air-menu-ui', [
	'air-menu-ui.filters',
	'air-menu-ui.services',
	'air-menu-ui.directives',
	'air-menu-ui.controllers',
	'air-menu-ui.templates',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'breakpointApp'
]);
angular.module('air-menu-ui.controllers', []);
angular.module('air-menu-ui.directives', [
	'air-menu-ui.directives.login-box',
	'air-menu-ui.directives.navbar',
	'air-menu-ui.directives.resource',
    'air-menu-ui.directives.application',
    'air-menu-ui.directives.nav',
    'air-menu-ui.directives.tab',
    'air-menu-ui.directives.rating'
]);
angular.module('air-menu-ui.directives.application', [])

    .directive('oauthApplication', function() {
        return {
            scope: {
                application: '='
            },
            restrict: 'E',
            templateUrl: '/air-menu/application.html',
            controller: [ '$scope', function($scope) {

            }]
        }
    });
angular.module('air-menu-ui.directives.login-box', [])

	.directive('loginBox', function() {
		return {
			scope: {
				handler: '=',
                registerFn: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/login-box.html',
			controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                $scope.registerMode = false;

				$scope.onSubmit = function() {
					$scope.pending = true;
					if ($scope.handler) {
						$scope.handler($scope.username, $scope.password, $scope.done);
					}
				};

                $scope.register = function() {
                    $scope.pending = true;
                    if ($scope.registerFn) {
                        $scope.registerFn($scope.username, $scope.name, $scope.phone, $scope.email, $scope.password, $scope.done);
                    }
                };

				$scope.done = function(successful) {
					$scope.pending = false;
					$scope.failure = !successful;
				};
			}]
		}
	});
angular.module('air-menu-ui.directives.nav', [])

    .directive('nav', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/air-menu/nav.html',
            replace: true,
            scope: {
                handler: '='
            },
            controller: [ '$scope', '$element', function($scope, $element) {
                var tabs = $scope.tabs = [];

                $scope.select = function(tab) {
                    angular.forEach(tabs, function(tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    $scope.handler(tab);
                };

                this.addTab = function(tab) {
                    if (tabs.length == 0) $scope.select(tab);
                    tabs.push(tab);
                };
            }]
        }
    });
angular.module('air-menu-ui.directives.navbar', [])

	.directive('navbar', function() {
		return {
			restrict: 'E',
			templateUrl: '/air-menu/navbar.html',
			controller: [ '$scope', function($scope) {
                $scope.$on('air-menu-ui.event.navbar.user', function(event, user) {
                    $scope.user = user;
                });
			}]
		}
	});
angular.module('air-menu-ui.directives.rating', [])

    .directive('ratingg', function() {
        return {
            scope: {
                stars: '='
            },
            restrict: 'E',
            templateUrl: '/air-menu/rating.html',
            controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {

                $scope.init = function() {
                    $scope.remainingStars = [ ];
                    $scope.fullStars = [ ];
                };

                $scope.$watch('stars', function(newStars) {
                    $scope.init();
                    for (var i = 0; i < parseInt(newStars); i++) { $scope.fullStars.push(i) }
                    for (var i = 0; i < 5-parseInt(newStars); i++) { $scope.remainingStars.push(i) }
                });

                $scope.init();
            }]
        }
    });
angular.module('air-menu-ui.directives.resource', [])

	.directive('resource', function() {
		return {
			scope: {
				resource: '=',
                handler: '='
			},
			restrict: 'E',
			templateUrl: '/air-menu/resource.html',
			controller: [ '$scope', function($scope) {
                $scope.select = function(selectedMethod) {
//                    angular.forEach($scope.resource.methods, function(method) {
//                        if (selectedMethod != method) method.selected = false;
//                    });
                    selectedMethod.selected = !selectedMethod.selected;
                }
			}]
		}
	});
angular.module('air-menu-ui.directives.tab', [])

    .directive('tabb', function() {
        return {
            scope: {
                otitle: '@'
            },
            require: '^nav',
            restrict: 'E',
            transclude: true,
            templateUrl: '/air-menu/tab.html',
            replace: true,
            link: function(scope, element, attrs, navCtrl) {
                navCtrl.addTab(scope);
            }
        }
    });
angular.module('air-menu-ui.filters', []);

angular.module('air-menu-ui.services', [
	'air-menu-ui.services.connector',
	'air-menu-ui.services.store',
	'air-menu-ui.services.models'
]);

angular.module('air-menu-ui.services.connector', [
    'air-menu-ui.services.connector.me',
    'air-menu-ui.services.connector.docs',
    'air-menu-ui.services.connector.applications',
    'air-menu-ui.services.connector.user_orders',
    'air-menu-ui.services.connector.user_credit_cards',
    'air-menu-ui.services.connector.user_notifications',
    'air-menu-ui.services.connector.restaurants',
    'air-menu-ui.services.connector.company_restaurants',
    'air-menu-ui.services.connector.restaurant_devices',
    'air-menu-ui.services.connector.restaurant_groups',
    'air-menu-ui.services.connector.restaurant_reviews',
    'air-menu-ui.services.connector.restaurant_staff_members',
    'air-menu-ui.services.connector.restaurant_orders',
    'air-menu-ui.services.connector.group_staff_members',
    'air-menu-ui.services.connector.devices',
    'air-menu-ui.services.connector.groups',
    'air-menu-ui.services.connector.users',
    'air-menu-ui.services.connector.companies'
    ])

	.factory('connector', [ '$rootScope', '$http', function($rootScope, $http) {
		var Connector = {
			fetch: function(method, path, params, successHandler, errorHandler) {
                var options = {
                    method: method,
                    url: path,
                    headers: {
                        'X-CSRF-Token': window.CSRF_TOKEN
                    }
                };
                if (method == 'POST') options.data = params || {};
                if (method == 'PUT') options.data = params || {};
                if (method == 'DELETE') options.data = params;
                if (method == 'GET') options.params = params || {};
				$http(options)
				.success(function(data, status, headers, config) {
					if (successHandler) successHandler(data, status);
				})
				.error(function(data, status, headers, config) {
					if (status == 401) $rootScope.$broadcast('air-menu-ui.event.unauthorized', data);
					if (errorHandler) errorHandler(data, status);
				})
			},
			get: function(path, params, successHandler, errorHandler) {
				this.fetch('GET', path, params, successHandler, errorHandler);
			},
			post: function(path, params, successHandler, errorHandler) {
				this.fetch('POST', path, params, successHandler, errorHandler);
			},
            put: function(path, params, successHandler, errorHandler) {
                this.fetch('PUT', path, params, successHandler, errorHandler);
            },
            delete: function(path, successHandler, errorHandler) {
                this.fetch('DELETE', path, null, successHandler, errorHandler);
            }
		};
		return Connector;
	}]);
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
angular.module('air-menu-ui.services.connector.company_restaurants', [])

    .factory('CompanyRestaurants', [ 'connector', 'Restaurant', function(connector, Restaurant) {
        var baseUrl = '/api/v1/companies/';
        return {
            get: function(company_id, successHandler, errorHandler) {
                connector.get(baseUrl + company_id + '/restaurants', null, function(data) {
                    var restaurants = [ ];
                    angular.forEach(data['restaurants'], function(restaurantData) {
                        restaurants.push(new Restaurant(restaurantData));
                    });
                    successHandler(restaurants);
                }, errorHandler, true);
            },
            create: function(company_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + company_id + '/restaurants', params, function(restaurantData) {
                    successHandler(new Restaurant(restaurantData));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.devices', [])

    .factory('Devices', [ 'connector', 'Device', function(connector, Device) {
        var baseUrl = '/api/v1/devices';
        return {
            show: function(device_id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + device_id, null, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            },
            update: function(id, params, successHandler, errorHandler) {
                connector.put(baseUrl + '/' + id, params, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            },
            delete: function(id, successHandler, errorHandler) {
                connector.delete(baseUrl + '/' + id, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.docs', [])

	.factory('Docs', [ 'connector', 'Doc', function(connector, Doc) {
		var baseUrl = '/docs/';
        var versions = ['v1', 'oauth2'];
		return {
			get: function(successHandler, errorHandler) {
                var self = this;
                this.finished = 0;
                var responses = [ ];
                angular.forEach(versions, function(version) {
                    connector.get(self.versionUrl(version), null, function(data) {
                        responses.push({version: version, content: new Doc(data['docs'])});
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
angular.module('air-menu-ui.services.connector.group_staff_members', [])

    .factory('GroupStaffMembers', [ 'connector', 'StaffMember', function(connector, StaffMember) {
        var baseUrl = '/api/v1/groups/';
        return {
            get: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + id + '/staff_members', null, function(data) {
                    var staff_members = [ ];
                    angular.forEach(data['staff_members'], function(staffMemberData) {
                        staff_members.push(new StaffMember(staffMemberData));
                    });
                    successHandler(staff_members);
                }, errorHandler, true);
            },
            create: function(id, params, successHandler, errorHandler) {
                connector.post(baseUrl + id + '/staff_members', params, function(data) {
                    successHandler(new StaffMember(data['staff_member']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.groups', [])

    .factory('Groups', [ 'connector', 'Group', function(connector, Group) {
        var baseUrl = '/api/v1/groups';
        return {
            show: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + id, null, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            },
            update: function(id, params, successHandler, errorHandler) {
                connector.put(baseUrl + '/' + id, params, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            },
            delete: function(id, successHandler, errorHandler) {
                connector.delete(baseUrl + '/' + id, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.me', [])

	.factory('Me', [ 'connector', 'User', function(connector, User) {
		var baseUrl = '/api/v1/me';
		return {
			get: function(successHandler, errorHandler) {
				connector.get(baseUrl, null, function(data) {
                    var user = new User(data['me']);
                    successHandler(user);
                }, errorHandler, true);
			}
		}
	}]);


angular.module('air-menu-ui.services.connector.restaurant_devices', [])

    .factory('RestaurantDevices', [ 'connector', 'Device', function(connector, Device) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/devices', null, function(data) {
                    var devices = [ ];
                    angular.forEach(data['devices'], function(deviceData) {
                        devices.push(new Device(deviceData));
                    });
                    successHandler(devices);
                }, errorHandler, true);
            },
            create: function(restaurant_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + restaurant_id + '/devices', params, function(data) {
                    successHandler(new Device(data['device']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.restaurant_groups', [])

    .factory('RestaurantGroups', [ 'connector', 'Group', function(connector, Group) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/groups', null, function(data) {
                    var groups = [ ];
                    angular.forEach(data['groups'], function(groupData) {
                        groups.push(new Group(groupData));
                    });
                    successHandler(groups);
                }, errorHandler, true);
            },
            create: function(restaurant_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + restaurant_id + '/groups', params, function(data) {
                    successHandler(new Group(data['group']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.restaurant_orders', [])

    .factory('RestaurantOrders', [ 'connector', 'Order', function(connector, Order) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/orders', null, function(data) {
                    var orders = [ ];
                    angular.forEach(data['orders'], function(reviewData) {
                        orders.push(new Order(reviewData));
                    });
                    successHandler(orders);
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.restaurant_reviews', [])

    .factory('RestaurantReviews', [ 'connector', 'Review', function(connector, Review) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/reviews', null, function(data) {
                    var reviews = [ ];
                    angular.forEach(data['reviews'], function(reviewData) {
                        reviews.push(new Review(reviewData));
                    });
                    successHandler(reviews);
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.restaurant_staff_members', [])

    .factory('RestaurantStaffMembers', [ 'connector', 'StaffMember', function(connector, StaffMember) {
        var baseUrl = '/api/v1/restaurants/';
        return {
            get: function(restaurant_id, successHandler, errorHandler) {
                connector.get(baseUrl + restaurant_id + '/staff_members', null, function(data) {
                    var staff_members = [ ];
                    angular.forEach(data['staff_members'], function(staffMemberData) {
                        staff_members.push(new StaffMember(staffMemberData));
                    });
                    successHandler(staff_members);
                }, errorHandler, true);
            },
            create: function(restaurant_id, params, successHandler, errorHandler) {
                connector.post(baseUrl + restaurant_id + '/staff_members', params, function(data) {
                    successHandler(new StaffMember(data['staff_member']));
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.restaurants', [])

    .factory('Restaurants', [ 'connector', 'Restaurant', function(connector, Restaurant) {
        var baseUrl = '/api/v1/restaurants';
        return {
            get: function(latitude, longitude, offset, successHandler, errorHandler) {
                connector.get(baseUrl, {latitude:latitude, longitude:longitude, offset:offset}, function(data) {
                    var restaurants = [ ];
                    angular.forEach(data['restaurants'], function(restaurantData) {
                        restaurants.push(new Restaurant(restaurantData));
                    });
                    successHandler(restaurants);
                }, errorHandler, true);
            },
            show: function(id, successHandler, errorHandler) {
                connector.get(baseUrl + '/' + id, null, function(data) {
                    successHandler(new Restaurant(data['restaurant']))
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.user_credit_cards', [])

    .factory('UserCreditCards', [ 'connector', 'CreditCard', function(connector, CreditCard) {
        var baseUrl = '/api/v1/me/credit_cards';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var credit_cards = [ ];
                    angular.forEach(data['credit_cards'], function(orderData) {
                        credit_cards.push(new CreditCard(orderData));
                    });
                    successHandler(credit_cards);
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.user_notifications', [])

    .factory('UserNotifications', [ 'connector', 'Notification', function(connector, Notification) {
        var baseUrl = '/api/v1/me/notifications';
        return {
            get: function(successHandler, errorHandler) {
                connector.get(baseUrl, null, function(data) {
                    var notifications = [ ];
                    angular.forEach(data['notifications'], function(notificationData) {
                         notifications.push(new Notification(notificationData));
                    });
                    successHandler(notifications);
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.user_orders', [])

    .factory('UserOrders', [ 'connector', 'Order', function(connector, Order) {
        var baseUrl = '/api/v1/me/orders';
        return {
            get: function(state, successHandler, errorHandler) {
                connector.get(baseUrl, {state: state}, function(data) {
                    var orders = [ ];
                    angular.forEach(data['orders'], function(orderData) {
                        orders.push(new Order(orderData));
                    });
                    successHandler(orders);
                }, errorHandler, true);
            }
        }
    }]);
angular.module('air-menu-ui.services.connector.users', [])

    .factory('Users', [ 'connector', 'User', function(connector, User) {
        var baseUrl = '/api/v1/users';
        return {
            create: function(params, successHandler, errorHandler) {
                connector.post(baseUrl, params, function(data) {
                    var user = new User(data['user']);
                    successHandler(user);
                }, errorHandler, true);
            }
        }
    }]);


angular.module('air-menu-ui.services.models', [
	'air-menu-ui.services.models.user',
    'air-menu-ui.services.models.scope',
    'air-menu-ui.services.models.doc',
    'air-menu-ui.services.models.order',
    'air-menu-ui.services.models.restaurant',
    'air-menu-ui.services.models.device',
    'air-menu-ui.services.models.group',
    'air-menu-ui.services.models.opening_hour',
    'air-menu-ui.services.models.review',
    'air-menu-ui.services.models.staff_kind',
    'air-menu-ui.services.models.staff_member',
    'air-menu-ui.services.models.webhook',
    'air-menu-ui.services.models.credit_card',
    'air-menu-ui.services.models.notification',
    'air-menu-ui.services.models.menu',
    'air-menu-ui.services.models.menu_section',
    'air-menu-ui.services.models.menu_item',
    'air-menu-ui.services.models.order',
    'air-menu-ui.services.models.order_item',
    'air-menu-ui.services.models.payment'
]);
angular.module('air-menu-ui.services.models.credit_card', [])

    .factory('CreditCard', [ function() {
        var CreditCard = function(creditCardData) {
            angular.extend(this, creditCardData);
        };

        return CreditCard;
    }]);
angular.module('air-menu-ui.services.models.device', [])

    .factory('Device', [ function() {
        var Device = function(deviceData) {
            angular.extend(this, deviceData);
        };

        return Device;
    }]);
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
angular.module('air-menu-ui.services.models.group', [])

    .factory('Group', [ function() {
        var Group = function(groupData) {
            angular.extend(this, groupData);
        };

        return Group;
    }]);
angular.module('air-menu-ui.services.models.menu', [])

    .factory('Menu', [ function() {
        var Menu = function(menuData) {
            angular.extend(this, menuData);
        };

        return Menu;
    }]);
angular.module('air-menu-ui.services.models.menu_item', [])

    .factory('MenuItem', [ function() {
        var MenuItem = function(menuItemData) {
            angular.extend(this, menuItemData);
        };

        return MenuItem;
    }]);
angular.module('air-menu-ui.services.models.menu_section', [])

    .factory('MenuSection', [ function() {
        var MenuSection = function(menuSectionData) {
            angular.extend(this, menuSectionData);
        };

        return MenuSection;
    }]);
angular.module('air-menu-ui.services.models.notification', [])

    .factory('Notification', [ function() {
        var Notification = function(notificationData) {
            angular.extend(this, notificationData);
        };

        return Notification;
    }]);
angular.module('air-menu-ui.services.models.opening_hour', [])

    .factory('OpeningHour', [ function() {
        var OpeningHour = function(openingHour) {
            angular.extend(this, openingHour);
        };

        return OpeningHour;
    }]);
angular.module('air-menu-ui.services.models.order', [])

    .factory('Order', [ function() {
        var Order = function(orderData) {
            angular.extend(this, orderData);
        };

        Order.prototype.totalCost = function() {
            var total = 0.0;
            angular.forEach(this.order_items, function(order_item) {
                total += order_item.menu_item.price;
            });
            return total;
        };

        return Order;
    }]);
angular.module('air-menu-ui.services.models.order_item', [])

    .factory('OrderItem', [ function() {
        var OrderItem = function(orderItemData) {
            angular.extend(this, orderItemData);
        };

        return OrderItem;
    }]);
angular.module('air-menu-ui.services.models.payment', [])

    .factory('Payment', [ function() {
        var Payment = function(paymentData) {
            angular.extend(this, paymentData);
        };

        return Payment;
    }]);
angular.module('air-menu-ui.services.models.restaurant', [])

    .factory('Restaurant', [ function() {
        var Restaurant = function(restaurantData) {
            angular.extend(this, restaurantData);
        };

        return Restaurant;
    }]);
angular.module('air-menu-ui.services.models.review', [])

    .factory('Review', [ function() {
        var Review = function(reviewData) {
            angular.extend(this, reviewData);
        };

        return Review;
    }]);
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
angular.module('air-menu-ui.services.models.staff_kind', [])

    .factory('StaffKind', [ function() {
        var StaffKind = function(staffKindData) {
            angular.extend(this, staffKindData);
        };

        return StaffKind;
    }]);
angular.module('air-menu-ui.services.models.staff_member', [])

    .factory('StaffMember', [ function() {
        var StaffMember = function(staffMemberData) {
            angular.extend(this, staffMemberData);
        };

        return StaffMember;
    }]);
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
angular.module('air-menu-ui.services.models.webhook', [])

    .factory('Webhook', [ function() {
        var Webhook = function(webhookData) {
            angular.extend(this, webhookData);
        };

        return Webhook;
    }]);
angular.module('air-menu-ui.services.store', [])

	.factory('store', function() {
		var Store = {
			set: function(name, value) {
				if (value) localStorage[name] = btoa(JSON.stringify(value));
			},
			get: function(name) {
				return JSON.parse(atob(localStorage[name]));
			},
			has: function(name) {
				return !!localStorage[name];
			},
			empty: function(name) {
				localStorage[name] = null;
			},
			valid: function(name, value) {
				var valid;
				try {
					if (value) valid = JSON.parse(atob(value));
					else valid = JSON.parse(atob(localStorage[name]));
				} catch(err) {
					valid = false;
				}
				return valid
			}
		};
		return Store;
	});
angular.module('air-menu-ui.templates', ['/air-menu/application.html', '/air-menu/login-box.html', '/air-menu/nav.html', '/air-menu/navbar.html', '/air-menu/rating.html', '/air-menu/resource.html', '/air-menu/tab.html']);

angular.module("/air-menu/application.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/application.html",
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <hr />\n" +
    "            <h3>\n" +
    "                <span ng-if=\"application.trusted\" class=\"label label-success\">Trusted</span> <i ng-if=\"!application.trusted\" class=\"fa fa-unlock\"></i> {{application.name}} <small>{{application.redirect_uri}}</small>\n" +
    "            </h3>\n" +
    "            <p style=\"word-break: break-all;\"><strong>Client ID: </strong>{{application.client_id}}</p>\n" +
    "            <p style=\"word-break: break-all;\"><strong>Client SECRET: </strong>{{application.client_secret}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/air-menu/login-box.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/login-box.html",
    "<form role=\"form\" class=\"login-box\" ng-submit=\"onSubmit()\">\n" +
    "	<div ng-if=\"failure && !registerMode\" class=\"alert alert-danger\">\n" +
    "		Oh no! Your username / password combination seems to fail!\n" +
    "	</div>\n" +
    "    <div ng-if=\"failure && registerMode\" class=\"alert alert-danger\">\n" +
    "        Username / Email is already taken! Try another combination\n" +
    "    </div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n" +
    "			<input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"Username\" ng-model=\"username\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "    <div class=\"form-group\" ng-show=\"registerMode\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-coffee\"></i></span>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Full Name\" ng-model=\"name\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"registerMode\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-mobile-phone\"></i></span>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"phone\" placeholder=\"Phone Number\" ng-model=\"phone\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"registerMode\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n" +
    "            <input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" ng-model=\"email\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-lock\"></i></span>\n" +
    "			<input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"password\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "    <div class=\"form-group\" ng-show=\"registerMode\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-lock\"></i></span>\n" +
    "            <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" placeholder=\"Confirm Password\" ng-model=\"confirmPassword\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "	<div class=\"checkbox\" ng-show=\"!registerMode\">\n" +
    "		<label>\n" +
    "			<input type=\"checkbox\" /> Remember Me\n" +
    "		</label>\n" +
    "	</div>\n" +
    "	<button type=\"submit\" ng-show=\"!registerMode\" class=\"btn btn-success btn-block {{pending || !username || !password ? 'disabled' : ''}}\" {{pending ? 'disabled' : ''}}>SIGN IN</button>\n" +
    "    <button type=\"button\" ng-show=\"!registerMode\" class=\"btn btn-info btn-block\" ng-click=\"registerMode=!registerMode;failure=false;\">SIGN UP</button>\n" +
    "    <button type=\"button\" ng-show=\"registerMode\" class=\"btn btn-success btn-block\" ng-click=\"register()\">REGISTER</button>\n" +
    "    <button type=\"button\" ng-show=\"registerMode\" class=\"btn btn-info btn-block\" ng-click=\"registerMode=!registerMode;failure=false;\">BACK TO SIGN IN</button>\n" +
    "</form>");
}]);

angular.module("/air-menu/nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/nav.html",
    "<div class=\"tabbable\">\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "        <li ng-repeat=\"tab in tabs\" ng-class=\"{active:tab.selected}\">\n" +
    "            <a href=\"\" ng-click=\"select(tab)\">{{tab.otitle}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div class=\"tab-content\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("/air-menu/navbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/navbar.html",
    "<nav class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#menu\">\n" +
    "				<span class=\"sr-only\">Toggle navigation</span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "			</button>\n" +
    "			<a href=\"#\" class=\"navbar-brand\" style=\"padding: 0; margin-top: 3px\">\n" +
    "                <img src=\"assets/air_menu_logo_white-500x500.png\" class=\"img-responsive\" height=\"64px\" width=\"64px\">\n" +
    "			</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"collapse navbar-collapse\" id=\"menu\">\n" +
    "            <a ng-if=\"!user\" href=\"#/login\" class=\"btn btn-default navbar-right navbar-btn\">Login</a>\n" +
    "			<ul ng-if=\"user\" class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"go('/notifications')\" tooltip-placement=\"bottom\" tooltip=\"Notifications\" ><i class=\"fa fa-bell-o\"></i> </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"go('/')\"><i class=\"fa fa-home\"></i> Home </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0);\" ng-if=\"user.company\" ng-click=\"go('/restaurants')\"><i class=\"fa fa-cogs\"></i> Restaurants</a>\n" +
    "                </li>\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"javascript:void(0);\" class=\"dropdown-toggle\" ng-disabled=\"disabled\"><i class=\"fa fa-user\"></i> {{user.name}} <b class=\"caret\"></b></a>\n" +
    "					<ul class=\"dropdown-menu\">\n" +
    "						<li><a href=\"/logout\">Logout</a></li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</nav>");
}]);

angular.module("/air-menu/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/rating.html",
    "<div>\n" +
    "    <i class=\"fa fa-star\" ng-repeat=\"star in fullStars\"></i><i class=\"fa fa-star-o\" ng-repeat=\"star in remainingStars\"></i>\n" +
    "</div>");
}]);

angular.module("/air-menu/resource.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/resource.html",
    "<div class=\"container\" id=\"{{resource.name.replace(' > ', '').replace('-', '').replace(' ', '')}}\">\n" +
    "	<h1><i class=\"fa fa-rss\"></i> <a href=\"\" ng-click=\"click()\">{{resource.name}}</a></h1>\n" +
    "	<p class=\"lead\">{{resource.short_description}}</p>\n" +
    "	<div class=\"resource\" ng-repeat=\"method in resource.methods\">\n" +
    "		<div ng-repeat=\"api in method.apis\">\n" +
    "            <div ng-click=\"select(method)\">\n" +
    "                <div class=\"method {{api.http_method}}\" style=\"cursor: pointer;\">{{api.http_method}}</div>\n" +
    "                <div class=\"path\" style=\"cursor: pointer;\">{{api.api_url}}</div>\n" +
    "            </div>\n" +
    "            <div ng-if=\"method.selected\" class=\"slide-down\">\n" +
    "                <div class=\"container\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-10 col-lg-offset-1\">\n" +
    "                            <div ng-if=\"method.full_description\">\n" +
    "                                <h3>Description</h3>\n" +
    "                                <p class=\"voffset3\" ng-bind-html=\"method.full_description\"></p>\n" +
    "                                <hr />\n" +
    "                            </div>\n" +
    "                            <div ng-if=\"method.formats.length > 0\">\n" +
    "                                <h3>Available Formats:</h3>\n" +
    "                                <span class=\"label label-info\" ng-repeat=\"format in method.formats\" style=\"margin-right:3px;\">{{format}}</span>\n" +
    "                                <hr />\n" +
    "                            </div>\n" +
    "                            <div ng-if=\"method.scope.scopes\">\n" +
    "                                <h3>Required Scopes:</h3>\n" +
    "                                <span class=\"label label-primary\" ng-repeat=\"scope in method.scope.scopes\" style=\"margin-right:3px;\">{{scope}}</span>\n" +
    "                                <hr />\n" +
    "                            </div>\n" +
    "                            <div ng-if=\"method.params.length > 0\">\n" +
    "                                <h3>Parameters</h3>\n" +
    "                                <div class=\"list-group\">\n" +
    "                                    <div class=\"list-group-item\" ng-class=\"{true: 'list-group-item-warning'}[!param.required]\" ng-repeat=\"param in method.params\">\n" +
    "                                        <h4 class=\"list-group-item-heading\">{{param.name}}</h4>\n" +
    "                                        <p class=\"list-group-item-text\" ng-bind-html=\"param.description\"></p>\n" +
    "                                        <p><strong>Expected: </strong>{{param.expected_type}}</p>\n" +
    "                                        <p ng-if=\"!method.scope.isEmpty()\">Scopes: <span class=\"label label-primary\" ng-repeat=\"scope in param.scope.scopes\" style=\"margin-right:3px;\">{{scope}}</span></p>\n" +
    "                                        <p ng-if=\"!param.required\">Optional</p>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <hr />\n" +
    "                            </div>\n" +
    "                            <h3>Examples</h3>\n" +
    "                            <pre ng-repeat=\"example in method.examples\">{{example}}</pre>\n" +
    "                            <hr />\n" +
    "                            <div ng-if=\"method.errors.length > 0\">\n" +
    "                                <h3>Errors</h3>\n" +
    "                                <div class=\"list-group\">\n" +
    "                                    <div class=\"list-group-item\" ng-repeat=\"error in method.errors\">\n" +
    "                                        <h4 class=\"list-group-item-heading\">{{error.code}}</h4>\n" +
    "                                        <p class=\"list-group-item-text\">{{error.description}}</p>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("/air-menu/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/tab.html",
    "<div ng-class=\"{true: 'hidden'}[!selected]\" ng-transclude>\n" +
    "\n" +
    "</div>");
}]);
