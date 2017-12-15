var MobileWrapper;
(function (MobileWrapper) {
    'use strict';
    var wrapper = angular.module('mobile-wrapper', ['ui.router', 'ngCordova', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap']);
    wrapper.controller('indexController', MobileWrapper.Controllers.IndexController);
    wrapper.controller('loginController', MobileWrapper.Controllers.LoginController);
    wrapper.controller('homeController', MobileWrapper.Controllers.HomeController);
    wrapper.controller('testController', MobileWrapper.Controllers.TestController);
    wrapper.controller('mainController', MobileWrapper.Controllers.MainController);
    wrapper.controller('errorController', MobileWrapper.Controllers.ErrorController);
    wrapper.directive('dynamic', MobileWrapper.Directives.DynamicHtml.Factory());
    wrapper.service('httpService', MobileWrapper.Services.HttpService);
    wrapper.service('cacheService', MobileWrapper.Services.CacheService);
    wrapper.service('templatingService', MobileWrapper.Services.TemplatingService);
    wrapper.service('commonService', MobileWrapper.Services.CommonService);
    wrapper.service('authService', MobileWrapper.Services.AuthService);
    wrapper.service('errorService', MobileWrapper.Services.ErrorService);
    wrapper.config(MobileWrapper.Config.RouteConfig);
    wrapper.service('apiConstants', MobileWrapper.Constants.ApiConstants);
    wrapper.service('templateConstants', MobileWrapper.Constants.TemplateConstants);
    wrapper.service('cacheConstants', MobileWrapper.Constants.CacheConstants);
    wrapper.service('commonConstants', MobileWrapper.Constants.CommonConstants);
    var httpConfig = function ($httpProvider) {
        $httpProvider.interceptors.push(MobileWrapper.Config.AuthInterceptor.Factory);
    };
    wrapper.config(httpConfig);
})(MobileWrapper || (MobileWrapper = {}));
