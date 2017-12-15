var MobileWrapper;
(function (MobileWrapper) {
    var Controllers;
    (function (Controllers) {
        var LoginController = (function () {
            function LoginController($scope, commonService) {
                this.scope = $scope;
                this.scope.html = 'testing the login page<button ng-click="index.setPage(\'home\')">home</button>';
                this.commonService = commonService;
                this.commonService.SetMenuVisibility(false);
            }
            LoginController.$inject = ['$scope', 'commonService'];
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
    })(Controllers = MobileWrapper.Controllers || (MobileWrapper.Controllers = {}));
})(MobileWrapper || (MobileWrapper = {}));
