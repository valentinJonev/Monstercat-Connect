module MobileWrapper.Controllers {

    export interface IndexScope extends ng.IScope{
        menu: string | null;
        mySplitter: any;
        appName: string;
    }

    export class IndexController
    {
        private scope: IndexScope;
        private commonService: Services.CommonService;
        private templateConstants: Constants.TemplateConstants;
        private state: ng.ui.IStateService;
        private commonConstants: Constants.CommonConstants;

        static $inject = ['$scope', 'commonService', '$state', 'templateConstants', 'commonConstants'];
        
        constructor($scope: IndexScope, commonService: Services.CommonService, $state: ng.ui.IStateService, 
                    templateConstants: Constants.TemplateConstants, commonConstants: Constants.CommonConstants) {
            this.scope = $scope;
            this.commonService = commonService;
            this.templateConstants = templateConstants;
            this.commonConstants = commonConstants;
            this.state = $state;
            this.commonService.SetMenuVisibility(false);
            this.scope.appName = this.commonConstants.APP_NAME;
        }

        public SetPage(page: string, params: any = '') {
            this.commonService.NavigateToPage(page, this.state, this.scope, params)
        }

        public RefreshMenu() {
            this.commonService.ReloadMenu();
        }

        public Logout(){
            this.commonService.Logout(this.state, this.scope);
        }
    }
}