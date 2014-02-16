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