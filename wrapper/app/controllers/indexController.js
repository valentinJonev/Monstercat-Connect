var MobileWrapper;
(function (MobileWrapper) {
    var Controllers;
    (function (Controllers) {
        var IndexController = (function () {
            function IndexController($scope, commonService, $state, templateConstants) {
                this.scope = $scope;
                this.commonService = commonService;
                this.templateConstants = templateConstants;
                this.state = $state;
                this.commonService.SetMenuVisibility(true);
                this.LoadMenu();
            }
            IndexController.prototype.setPage = function (page) {
                this.commonService.NavigateToPage(page, this.state);
            };
            IndexController.prototype.LoadMenu = function () {
                var _this = this;
                this.commonService.LoadTemplate(this.templateConstants.MENU_TEMPLATE, {})
                    .then(function (success) {
                    _this.scope.menu = success;
                }, function (error) {
                    _this.scope.menu = error;
                });
            };
            IndexController.$inject = ['$scope', 'commonService', '$state', 'templateConstants'];
            return IndexController;
        }());
        Controllers.IndexController = IndexController;
    })(Controllers = MobileWrapper.Controllers || (MobileWrapper.Controllers = {}));
})(MobileWrapper || (MobileWrapper = {}));
