module MobileWrapper.Controllers{

    export class InfoController{
        private modalInstance: ng.ui.bootstrap.IModalServiceInstance;
        public canCancel: boolean;

        static $inject = ['$uibModalInstance', 'cancel'];

        constructor($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, cancel: boolean) {
            this.modalInstance = $uibModalInstance;
            this.canCancel = cancel;
        }

        public ok(){
            this.modalInstance.close();
        }

        public cancel(){
            this.modalInstance.dismiss();
        }
    }
}