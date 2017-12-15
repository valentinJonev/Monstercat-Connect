module MobileWrapper.Controllers {
    interface HomeScope extends ng.IScope{
        html: string | null
    }

    export class HomeController {
        private scope: HomeScope;
        private commonService: Services.CommonService;

        static $inject = ['$scope', 'commonService'];

        constructor($scope: HomeScope, commonService: Services.CommonService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.scope.html = 'welcome home';
            this.commonService.SetMenuVisibility(true);
        }
    }
}