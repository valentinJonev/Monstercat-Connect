var MobileWrapper;
(function (MobileWrapper) {
    var Config;
    (function (Config) {
        var RouteConfig = (function () {
            function RouteConfig($stateProvider, $urlRouterProvider) {
                var _this = this;
                this.configureRoutes = function () {
                    var homeState = {
                        name: 'home',
                        url: '/',
                        templateUrl: 'views/template.html',
                        controller: 'homeController'
                    };
                    var testState = {
                        name: 'test',
                        url: '/test',
                        templateUrl: 'views/template.html',
                        controller: 'testController'
                    };
                    var mainState = {
                        name: 'main',
                        url: '/main',
                        templateUrl: 'views/template.html',
                        controller: 'mainController'
                    };
                    var loginState = {
                        name: 'login',
                        url: '/login',
                        templateUrl: 'views/template.html',
                        controller: 'loginController'
                    };
                    _this.stateProvider.state(homeState);
                    _this.stateProvider.state(testState);
                    _this.stateProvider.state(mainState);
                    _this.stateProvider.state(loginState);
                    _this.urlRouterProvider.otherwise('/login');
                };
                this.stateProvider = $stateProvider;
                this.urlRouterProvider = $urlRouterProvider;
                this.configureRoutes();
            }
            RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
            return RouteConfig;
        }());
        Config.RouteConfig = RouteConfig;
    })(Config = MobileWrapper.Config || (MobileWrapper.Config = {}));
})(MobileWrapper || (MobileWrapper = {}));
