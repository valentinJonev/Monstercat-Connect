var MobileWrapper;
(function (MobileWrapper) {
    var Config;
    (function (Config) {
        var AuthInterceptor = (function () {
            function AuthInterceptor(cacheConstants) {
                var _this = this;
                this.request = function (config) {
                    var authToken = window.localStorage.getItem(_this.cacheConstants.OAUTH_TOKEN);
                    if (authToken != null) {
                        config.headers.Authorization = 'Bearer ' + authToken;
                    }
                    return config;
                };
                this.cacheConstants = cacheConstants;
            }
            AuthInterceptor.Factory = function (cacheConstants) {
                return new AuthInterceptor(cacheConstants);
            };
            return AuthInterceptor;
        }());
        Config.AuthInterceptor = AuthInterceptor;
    })(Config = MobileWrapper.Config || (MobileWrapper.Config = {}));
})(MobileWrapper || (MobileWrapper = {}));
