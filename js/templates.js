angular.module('air-menu-ui.templates', ['/air-menu/application.html', '/air-menu/login-box.html', '/air-menu/nav.html', '/air-menu/navbar.html', '/air-menu/resource.html', '/air-menu/tab.html']);

angular.module("/air-menu/application.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/application.html",
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <hr />\n" +
    "            <h3>\n" +
    "                <span ng-if=\"application.trusted\" class=\"label label-success\">Trusted</span> <i ng-if=\"!application.trusted\" class=\"fa fa-unlock\"></i> {{application.name}} <small>{{application.redirect_uri}}</small>\n" +
    "            </h3>\n" +
    "            <p><strong>Client ID: </strong>{{application.client_id}}</p>\n" +
    "            <p><strong>Client SECRET: </strong>{{application.client_secret}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/air-menu/login-box.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/login-box.html",
    "<form role=\"form\" class=\"login-box\" ng-submit=\"onSubmit()\">\n" +
    "	<div ng-if=\"failure\" class=\"alert alert-danger\">\n" +
    "		Oh no! You username/password combination seems to fail!\n" +
    "	</div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n" +
    "			<input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"Username\" ng-model=\"username\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"input-group\">\n" +
    "			<span class=\"input-group-addon\"><i class=\"fa fa-lock\"></i></span>\n" +
    "			<input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"password\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"checkbox\">\n" +
    "		<label>\n" +
    "			<input type=\"checkbox\" /> Remember Me\n" +
    "		</label>\n" +
    "	</div>\n" +
    "	<button type=\"submit\" class=\"btn btn-primary btn-block {{pending || !username || !password ? 'disabled' : ''}}\" {{pending ? 'disabled' : ''}}>SIGN IN</button>\n" +
    "</form>");
}]);

angular.module("/air-menu/nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/nav.html",
    "<div class=\"tabbable\">\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "        <li ng-repeat=\"tab in tabs\" ng-class=\"{active:tab.selected}\">\n" +
    "            <a href=\"\" ng-click=\"select(tab)\">{{tab.title}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div class=\"tab-content\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("/air-menu/navbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/navbar.html",
    "<nav class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "	<div class=\"container-fluid\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#menu\">\n" +
    "				<span class=\"sr-only\">Toggle navigation</span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "			</button>\n" +
    "			<a href=\"#\" class=\"navbar-brand\">AirMenu</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"collapse navbar-collapse\" id=\"menu\">\n" +
    "            <a ng-if=\"!user\" href=\"#/login\" class=\"btn btn-default navbar-right navbar-btn\">Login</a>\n" +
    "			<ul ng-if=\"user\" class=\"nav navbar-nav navbar-right\">\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-user\"></i> {{user.name}} <b class=\"caret\"></b></a>\n" +
    "					<ul class=\"dropdown-menu\">\n" +
    "						<li><a href=\"#\">Profile</a></li>\n" +
    "						<li ng-if=\"user.isDeveloper()\"><a href=\"#/documentation\">API Documentation</a></li>\n" +
    "                        <li ng-if=\"user.isDeveloper()\"><a href=\"#/applications\">Developer Apps</a></li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li><a href=\"/logout\">Logout</a></li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</nav>");
}]);

angular.module("/air-menu/resource.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/resource.html",
    "<div class=\"container\">\n" +
    "	<h1><i class=\"fa fa-rss\"></i> {{resource.name}}</h1>\n" +
    "	<p class=\"lead\">{{resource.short_description}}</p>\n" +
    "	<div class=\"resource\" ng-repeat=\"method in resource.methods\">\n" +
    "		<div ng-repeat=\"api in method.apis\">\n" +
    "			<div class=\"method {{api.http_method}}\">{{api.http_method}}</div>\n" +
    "			<div class=\"path\">{{api.api_url}}</div>\n" +
    "		</div>\n" +
    "		<!--<p ng-bind-html=\"method.full_description\"></p>-->\n" +
    "		<!--<strong>Formats:</strong> <span class=\"label label-default\" ng-repeat=\"format in method.formats\"> {{format}}</span>-->\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("/air-menu/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/air-menu/tab.html",
    "<div ng-class=\"{true: 'hidden'}[!selected]\" ng-transclude>\n" +
    "\n" +
    "</div>");
}]);
