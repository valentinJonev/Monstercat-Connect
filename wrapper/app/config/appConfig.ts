module MobileWrapper.Config{
    export class AppConfig{
        private rootScope: Config.IRootScope;
        private apiConstants: Constants.ApiConstants;
        private commonService: Services.CommonService;
        private updateService: Services.UpdateService;
        private authService: Services.AuthService;
        private cacheService: Services.CacheService;
        private templateConstants: Constants.TemplateConstants;
        private state: any;
        private notificationService: any;
        private http: ng.IHttpService;
        private isOnline = true;

        static $inject = ['$rootScope', 'apiConstants', 'commonService', 'updateService', '$state', 'Notification', '$http',
                        'authService', 'cacheService', 'templateConstants']

        constructor($rootScope: Config.IRootScope, apiConstants: Constants.ApiConstants, commonService: Services.CommonService, 
                    updateService: Services.UpdateService, $state: any, Notification: any, $http: ng.IHttpService,
                    authService: Services.AuthService, cacheService: Services.CacheService, templateConstants: Constants.TemplateConstants) {
            this.rootScope = $rootScope;
            this.apiConstants = apiConstants;
            this.commonService = commonService;
            this.updateService = updateService;
            this.authService = authService;
            this.cacheService = cacheService;
            this.templateConstants = templateConstants;
            this.state = $state;
            this.notificationService = Notification;
            this.http = $http;

            this.authService.IsLoggedIn()
            .then(() => {
                this.commonService.ReloadMenu();
                this.commonService.NavigateToPage('home', this.state, this.rootScope);
            }, () => {
                this.commonService.NavigateToPage('loading', this.state, this.rootScope);
            })

            this.setHandlers();

            setInterval(this.pingServer, 20000);
        }

        setHandlers = () => {
            this.rootScope.$on('unauthorized', (event: any, data: string) => {
                this.notificationService.warning(data);
                this.commonService.Logout(this.state, this.rootScope);
            });

            /*this.rootScope.$on('update', (event: any, data: string) => {
                this.updateService.HasUpdate()
                .catch(() => {
                    this.updateService.CheckForUpdate()
                    .then((update: any) => {
                        if(!update.optional){
                            this.updateService.ShowUpdateMessage();
                        }
                        else{
                            this.notificationService.info('An update is available. Go to settings to update.');
                        }
                    })
                })
                
            });*/

            navigator.serviceWorker.addEventListener('message', event => {
                if(event.data.msg == 'error'){
                    let error = JSON.parse(event.data.error);
                    switch(error.error_code){
                        case 401:
                            this.rootScope.$emit("unauthorized", error.error);
                            break;
                        case 512:
                            this.rootScope.$emit("update", error.error);
                            break;
                        case 409:
                            //update cache
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        pingServer = () => {
            fetch(this.apiConstants.GetLoginService(), { headers: {
                    Accept: '*/*'
                }})
            .then(() => {
                if(!this.isOnline){
                    this.isOnline = true;
                    this.notificationService.success('Connected to the server', { replaceMessage: true });
                }
            }, (error) => {
                if(this.isOnline){
                    console.log(error);
                    this.isOnline = false;
                    this.notificationService.error('Disconnected from the server', { replaceMessage: true });
                }
            })
        }
    }
}