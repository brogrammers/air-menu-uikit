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
    "	<button type=\"submit\" class=\"btn btn-success btn-block {{pending || !username || !password ? 'disabled' : ''}}\" {{pending ? 'disabled' : ''}}>SIGN IN</button>\n" +
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
    "                <li>\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"go('/')\"><i class=\"fa fa-home\"></i> Home </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0);\" ng-if=\"user.company\" ng-click=\"go('/restaurants')\"><i class=\"fa fa-cogs\"></i> Restaurants</a>\n" +
    "                </li>\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-user\"></i> {{user.name}} <b class=\"caret\"></b></a>\n" +
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
