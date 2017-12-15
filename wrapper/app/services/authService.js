var MobileWrapper;
(function (MobileWrapper) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService(httpService, apiConstants, cacheService, $q, cacheConstants, commonConstants) {
                this.httpService = httpService;
                this.apiConstants = apiConstants;
                this.cacheService = cacheService;
                this.cacheConstants = cacheConstants;
                this.commonConstants = commonConstants;
            }
            AuthService.prototype.Login = function (username, password) {
                var _this = this;
                var deferred = this.q.defer();
                this.httpService.post(this.apiConstants.LOGIN_SERVICE, { username: username, password: password })
                    .then(function (success) {
                    _this.cacheService.SetValue(_this.cacheConstants.OAUTH_TOKEN, success);
                    _this.cacheService.SetValue(_this.cacheConstants.LOGGED_IN, _this.commonConstants.TRUE);
                    deferred.resolve('Logged in');
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.IsLoggedIn = function () {
                var _this = this;
                this.cacheService.getCache(this.cacheConstants.LOGGED_IN)
                    .then(function (success) {
                    if (success == _this.commonConstants.TRUE) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }, function (error) {
                    return false;
                });
            };
            AuthService.prototype.Logout = function () {
                this.cacheService.SetValue(this.cacheConstants.LOGGED_IN, this.commonConstants.FALSE);
                this.cacheService.SetValue(this.cacheConstants.OAUTH_TOKEN, '');
            };
            AuthService.$inject = ['httpService', 'apiConstants', 'cacheService', '$q', 'cacheConstants', 'commonConstants'];
            return AuthService;
        }());
        Services.AuthService = AuthService;
    })(Services = MobileWrapper.Services || (MobileWrapper.Services = {}));
})(MobileWrapper || (MobileWrapper = {}));
