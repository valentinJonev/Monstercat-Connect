module MobileWrapper.Controllers{

    export class ErrorController{
        private modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        static $inject = ['$uibModalInstance'];

        constructor($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
            this.modalInstance = $uibModalInstance;
        }

        public cancel(){
            this.modalInstance.dismiss();
        }
    }
}