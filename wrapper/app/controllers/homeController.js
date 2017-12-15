var MobileWrapper;
(function (MobileWrapper) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, commonService) {
                this.scope = $scope;
                this.commonService = commonService;
                this.scope.html = 'welcome home';
                this.commonService.SetMenuVisibility(true);
            }
            HomeController.$inject = ['$scope', 'commonService'];
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = MobileWrapper.Controllers || (MobileWrapper.Controllers = {}));
})(MobileWrapper || (MobileWrapper = {}));
