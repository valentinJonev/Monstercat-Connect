var MobileWrapper;
(function (MobileWrapper) {
    var Services;
    (function (Services) {
        'use strict';
        var HttpService = (function () {
            function HttpService($http, $q) {
                this.http = $http;
                this.q = $q;
            }
            HttpService.prototype.get = function (url, params) {
                var _this = this;
                var deferred = this.q.defer();
                this.http({
                    url: url,
                    params: params,
                    method: 'GET'
                }).then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    _this.handleError(error)
                        .then(function (success) {
                        deferred.reject(success);
                    }, function (error) {
                        deferred.reject(error);
                    });
                });
                return deferred.promise;
            };
            HttpService.prototype.post = function (url, params) {
                var _this = this;
                var deferred = this.q.defer();
                this.http({
                    url: url,
                    data: params,
                    method: 'POST'
                }).then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    _this.handleError(error)
                        .then(function (success) {
                        deferred.reject(success);
                    }, function (error) {
                        deferred.reject(error);
                    });
                });
                return deferred.promise;
            };
            HttpService.prototype.handleError = function (error) {
                var deferred = this.q.defer();
                switch (error.status) {
                    case '401':
                        //login
                        deferred.resolve('login');
                        break;
                    case '512':
                        //update app
                        deferred.resolve('update app');
                        break;
                    case '409':
                        //update cache
                        deferred.resolve('update cache');
                        break;
                    default:
                        //show error dialog
                        deferred.reject(error.data);
                        break;
                }
                return deferred.promise;
            };
            HttpService.$inject = ['$http', '$q'];
            return HttpService;
        }());
        Services.HttpService = HttpService;
    })(Services = MobileWrapper.Services || (MobileWrapper.Services = {}));
})(MobileWrapper || (MobileWrapper = {}));
