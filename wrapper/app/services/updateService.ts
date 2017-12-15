module MobileWrapper.Services{
    export class UpdateService{
        private updater: any;
        private apiConstants: Constants.ApiConstants;
        private httpService: Services.HttpService;
        private cordovaAppVersion: any;
        public appVersion: string;
        private q: ng.IQService;
        private cordovaFileTransfer: any;
        private cacheService: Services.CacheService;
        private modalService: Services.ModalService;

        static $inject = ['apiConstants', 'httpService', '$cordovaAppVersion', '$q', '$cordovaFileTransfer', 'cacheService', 'modalService']

        constructor(apiConstants: Constants.ApiConstants, httpService: Services.HttpService, $cordovaAppVersion: any, $q: ng.IQService,
                    $cordovaFileTransfer: any, cacheService: Services.CacheService, modalService: Services.ModalService) {
            this.apiConstants = apiConstants;
            this.httpService = httpService;
            this.cordovaAppVersion = $cordovaAppVersion;
            this.q = $q;
            this.cordovaFileTransfer = $cordovaFileTransfer;
            this.cacheService = cacheService;
            this.modalService = modalService;
            //this.configureUpdater();
        }

        /*private configureUpdater(){
            var deferred = this.q.defer();
            this.cordovaAppVersion.getVersionNumber()
                .then((version) => {
                    this.appVersion = version;
                    this.cacheService.SetValue('appVersion', version);
                    deferred.resolve();
                })
            return deferred.promise
        }

        /*public CheckForUpdate(){
            var deferred = this.q.defer();

            this.httpService.Get(this.apiConstants.GetUpdateVersionService(), {})
            .then((updateResponse) => {
                if(this.appVersion != updateResponse.version){
                    var update = new this.cacheService.Update({
                        message: updateResponse.message,
                        version: updateResponse.version,
                        optional: updateResponse.optional
                    })
                    this.cacheService.Add(update);
                    deferred.resolve(update)
                }
                else{
                    deferred.reject();
                }
            })

            return deferred.promise;
        }*/

        /*public HasUpdate(){
            var deferred = this.q.defer();
            this.cacheService.GetUpdate()
            .then((update) => {
                if(update != null){
                    deferred.resolve();
                }
                else{
                    deferred.reject();
                }
            }, () => {
                deferred.reject();
            })

            return deferred.promise;
        }

        /*public ShowUpdateMessage(){
            this.cacheService.GetUpdate()
            .then((update: any) => {
                this.modalService.Info('New update is available', update.message, 'Update', this.Update, update.optional);
            })
        }*/

        /*public Update() {
            this.cacheService.GetUpdate()
            .then((update: any) => {
                this.updateService.getFileSystem()
                .then((fileSystem: any) => {
                    this.updateService.startUpdate(fileSystem, update);
                })
            })
        }*/

        /*startUpdate = (fileSystem: any, update: any) => {
            var localPath = fileSystem.root.toURL() + 'downloads/update.apk';
            var trustHosts = true;
            var options = {};

            this.cordovaFileTransfer.download(this.apiConstants.GetUpdateService() + update.version, localPath, options, trustHosts)
            .then((result) => {
                cordova.plugins.fileOpener2.open(
                    result.nativeURL,
                    'application/vnd.android.package-archive',
                    {
                        error : function(e) {
                            console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                        },
                        success : () => {
                            console.log('file opened successfully');
                            this.cacheService.Delete(update);
                        }
                    }
                );
            }, (error) => {
                console.log(error);
            })

        }*/

        /*getFileSystem = () => {
            var deferred = this.q.defer();

            (window as any).requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) { 
                var permissions = cordova.plugins.permissions; 
                    permissions.checkPermission (permissions.WRITE_EXTERNAL_STORAGE, function (status) { 
                        if(!status.hasPermission){
                            permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, (status) => {
                                if(!status.hasPermission){
                                    console.log('Error getting permissions');
                                    deferred.reject();
                                }
                                else{
                                    deferred.resolve(fileSystem);
                                }
                            }, (error) => {
                                console.log(error);
                                deferred.reject();
                            })
                        }
                        else{
                            deferred.resolve(fileSystem);
                        }
                    })
            })

            return deferred.promise;
        }
        */
    }
}