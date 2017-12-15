var MobileWrapper;
(function (MobileWrapper) {
    var Constants;
    (function (Constants) {
        var ApiConstants = (function () {
            function ApiConstants() {
                this.apiUrl = 'http://192.168.5.118:2404/site/view/imperia/';
                this.CACHE_SERVICE = this.apiUrl + '/default/';
                this.LOGIN_SERVICE = this.apiUrl + '/login';
                this.UPDATE_SERVICE = this.apiUrl + '/update';
            }
            return ApiConstants;
        }());
        Constants.ApiConstants = ApiConstants;
        var TemplateConstants = (function () {
            function TemplateConstants() {
                this.LOGIN_TEMPLATE = 'login';
                this.MENU_TEMPLATE = 'menu';
                this.HOME_TEMPLATE = 'home';
                this.ERROR_TEMPLATE = 'error';
            }
            return TemplateConstants;
        }());
        Constants.TemplateConstants = TemplateConstants;
        var CacheConstants = (function () {
            function CacheConstants() {
                this.OAUTH_TOKEN = 'oauthToken';
                this.LOGGED_IN = 'loggedIn';
            }
            return CacheConstants;
        }());
        Constants.CacheConstants = CacheConstants;
        var CommonConstants = (function () {
            function CommonConstants() {
                this.TRUE = 'true';
                this.FALSE = 'false';
            }
            return CommonConstants;
        }());
        Constants.CommonConstants = CommonConstants;
    })(Constants = MobileWrapper.Constants || (MobileWrapper.Constants = {}));
})(MobileWrapper || (MobileWrapper = {}));
