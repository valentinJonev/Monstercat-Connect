var MobileWrapper;
(function (MobileWrapper) {
    var Services;
    (function (Services_1) {
        var CommonService = (function () {
            function CommonService(templatingService, cacheSevice, $q, authService, errorService) {
                this.templateService = templatingService;
                this.cacheService = cacheSevice;
                this.authService = authService;
                this.errorService = errorService;
                this.q = $q;
            }
            CommonService.prototype.SetMenuVisibility = function (visibility) {
                if (visibility) {
                    $('.menu').show();
                }
                else {
                    $('.menu').hide();
                }
            };
            CommonService.prototype.NavigateToPage = function (page, $state) {
                var _this = this;
                //if(!this.authService.IsLoggedIn()){
                //    page = 'login'
                //}
                $state.go(page)
                    .then(function (success) {
                }, function (error) {
                    _this.errorService.HandleError('Error loading page', error, {});
                    console.log(error);
                });
            };
            CommonService.prototype.LoadTemplate = function (page, params) {
                var _this = this;
                var deferred = this.q.defer();
                this.cacheService.getCache(page)
                    .then(function (success) {
                    var html = _this.templateService.ParseTemplate(success, params);
                    deferred.resolve(html);
                }, function (error) {
                    _this.errorService.HandleError('Error loading resource', error, {});
                    deferred.reject('');
                });
                return deferred.promise;
            };
            CommonService.$inject = ['templatingService', 'cacheService', '$q', 'authService', 'errorService'];
            return CommonService;
        }());
        Services_1.CommonService = CommonService;
    })(Services = MobileWrapper.Services || (MobileWrapper.Services = {}));
})(MobileWrapper || (MobileWrapper = {}));
