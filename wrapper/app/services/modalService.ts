module MobileWrapper.Services{
    export class ModalService{
        private cacheService: Services.CacheService;
        private templateConstants: Constants.TemplateConstants;
        private templateService: Services.TemplatingService;
        private uibModal: ng.ui.bootstrap.IModalService;

        static $inject = ['cacheService', 'templateConstants', 'templatingService', '$uibModal']

        constructor(cacheService: Services.CacheService, templateConstants: Constants.TemplateConstants, templatingService: Services.TemplatingService, 
                    $uibModal: ng.ui.bootstrap.IModalService) {
            this.cacheService = cacheService;
            this.templateConstants = templateConstants;
            this.templateService = templatingService;
            this.uibModal = $uibModal;
        }

        public Error(title: string, error: string, errorParams: any){
            this.templateService.GetTemplate(this.templateConstants.ERROR_TEMPLATE, {title: title, message: error})
            .then((html) => {
                this.uibModal.open({
                    animation: true,
                    template: html,
                    controller: 'errorController',
                    controllerAs: 'err',
                    backdrop: 'static'
                })
            }, function(error){
                console.log('Error showing the error');
                console.log(error);
            });
        }

        public Info(title: string, message: string, confirm: string, onConfirm: any, canCancel: boolean = true){
            this.templateService.GetTemplate(this.templateConstants.INFO_TEMPLATE, {title: title, message: message, confirm: confirm})
            .then((html) => {
                var modal = this.uibModal.open({
                    animation: true,
                    template: html,
                    controller: 'infoController',
                    controllerAs: 'info',
                    backdrop: 'static',
                    resolve: {
                        cancel: function(){
                            return canCancel;
                        }
                    }
                })
                modal.result.then(() => {
                    onConfirm();
                })
            }, function(error){
                console.log('Error showing the modal');
                console.log(error);
            });
        }
    }
}