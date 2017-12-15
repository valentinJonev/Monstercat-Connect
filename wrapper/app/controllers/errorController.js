var MobileWrapper;
(function (MobileWrapper) {
    var Controllers;
    (function (Controllers) {
        var ErrorController = (function () {
            function ErrorController($uibModalInstance) {
                this.modalInstance = $uibModalInstance;
            }
            ErrorController.prototype.cancel = function () {
                this.modalInstance.dismiss('cancel');
            };
            ErrorController.$inject = ['$uibModalInstance'];
            return ErrorController;
        }());
        Controllers.ErrorController = ErrorController;
    })(Controllers = MobileWrapper.Controllers || (MobileWrapper.Controllers = {}));
})(MobileWrapper || (MobileWrapper = {}));
