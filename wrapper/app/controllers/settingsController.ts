module MobileWrapper.Controllers {
    interface SettingsScope extends ng.IScope{
        html: string | null,
        hasUpdate: boolean
    }

    export class SettingsController {
        private scope: SettingsScope;
        private commonService: Services.CommonService;
        private templateConstants: Constants.TemplateConstants;
        private updateService: Services.UpdateService;

        static $inject = ['$scope', 'commonService', 'templateConstants', 'updateService'];

        constructor($scope: SettingsScope, commonService: Services.CommonService, templateConstants: Constants.TemplateConstants, 
                    updateService: Services.UpdateService) {
            this.scope = $scope;
            this.scope.hasUpdate = false;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.templateConstants = templateConstants;
            this.updateService = updateService;
            this.loadTemplate();
            this.scope.hasUpdate = false;
            /*this.updateService.HasUpdate()
            .then(() => {
                this.scope.hasUpdate = true;
            }, () => {
                this.scope.hasUpdate = false;
            })*/
        }

        public Update(){
            //this.updateService.ShowUpdateMessage();
        }

        private loadTemplate(){
            this.commonService.LoadTemplate(this.templateConstants.SETTINGS_TEMPLATE, {appVersion: this.updateService.appVersion})
            .then((html) => {
                this.scope.html = html;
            }, (error) => {
                this.scope.html = error;
            })
        }
    }
}