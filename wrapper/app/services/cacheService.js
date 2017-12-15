var MobileWrapper;
(function (MobileWrapper) {
    var Services;
    (function (Services_1) {
        'use strict';
        var CacheService = (function () {
            function CacheService(httpService, $q, apiConstants, cacheConstants) {
                this.$inject = ['httpService', '$q', 'apiConstants', 'cacheConstants'];
                this.httpService = httpService;
                this.q = $q;
                this.apiConstants = apiConstants;
                this.cacheConstants = cacheConstants;
            }
            CacheService.prototype.getCache = function (name) {
                var deferred = this.q.defer();
                var cache = window.localStorage.getItem(name);
                if (cache == null && name != this.cacheConstants.LOGGED_IN) {
                    this.updateCache(name)
                        .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve(cache);
                }
                return deferred.promise;
            };
            CacheService.prototype.getAuthToken = function () {
                return window.localStorage.getItem(this.cacheConstants.OAUTH_TOKEN);
            };
            CacheService.prototype.SetValue = function (key, value) {
                window.localStorage.setItem(key, value);
            };
            CacheService.prototype.updateCache = function (name) {
                var deferred = this.q.defer();
                window.localStorage.removeItem(name);
                this.downloadCache(name)
                    .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            CacheService.prototype.downloadCache = function (name) {
                var deferred = this.q.defer();
                var serviceUrl = this.apiConstants.CACHE_SERVICE;
                var template = '';
                this.httpService.get(serviceUrl + name + '.html', '')
                    .then(function (res) {
                    template = res;
                    window.localStorage.setItem(name, template);
                    deferred.resolve(template);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            return CacheService;
        }());
        Services_1.CacheService = CacheService;
    })(Services = MobileWrapper.Services || (MobileWrapper.Services = {}));
})(MobileWrapper || (MobileWrapper = {}));
