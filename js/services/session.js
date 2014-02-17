angular.module('air-menu-ui.services.session', [])

	.factory('session', [ '$rootScope', 'AccessTokens', 'store', 'Me', function($rootScope, AccessTokens, store, Me) {
		var Session = {
			set: function(properties) {
				angular.extend(this, properties);
			},
			isSet: function() {
				return !!this.access_token && !!this.access_token.token;
			},
			restore: function() {
				if (store.has('access_token') && store.valid('access_token')) {
					this.set({access_token: store.get('access_token')});
					this.getCurrentUser();
				}
			},
			create: function(username, password, callback) {
				var params = this.credentialsParams({username: username, password: password});
				this.getAccessToken(params, callback);
			},
			refresh: function() {
				if (this.isSet()) {
					var params = this.refreshParams(this.access_token.refresh_token);
					this.getAccessToken(params);
				}
			},
			destroy: function() {
				this.access_token = undefined;
				this.user = undefined;
				store.empty('access_token');
				$rootScope.$broadcast('air-menu-ui.event.userLoggedOut');
			},
			getAccessToken: function(params, callback) {
				var self = this;
				AccessTokens.create(params, function(data, status) {
					self.set({access_token: data['access_token']});
					store.set('access_token', data['access_token']);
					self.getCurrentUser(callback);
				}, function(data, status) {
					if (callback) callback(false);
				});
			},
			getCurrentUser: function(callback) {
				var self = this;
				Me.get(function(data) {
					self.set({user: data['me']});
					$rootScope.$broadcast('air-menu-ui.event.userLoggedIn');
					if (callback) callback(true);
				}, function(data, status) {
					if (callback) callback(false);
				})
			},
			credentialsParams: function(credentials) {
				return this.baseParams({
					grant_type: 'password',
					username: credentials.username,
					password: credentials.password
				});
			},
			refreshParams: function(refresh_token) {
				return this.baseParams({
					grant_type: 'refresh_token',
					refresh_token: refresh_token
				});
			},
			baseParams: function(params) {
				var baseParams = {
					client_id: this.uid,
					client_secret: this.secret,
					scope: 'basic user'
				};
				angular.forEach(params, function(value, key) {
					baseParams[key] = value;
				});
				return baseParams;
			},
			setClient: function(uid, secret) {
				this.uid = uid;
				this.secret = secret;
			}
		};
		return Session;
	}]);