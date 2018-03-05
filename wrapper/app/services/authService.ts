module MobileWrapper.Services{

    export class AuthService{
        private httpService: Services.HttpService;
        private apiConstants: Constants.ApiConstants;
        private cacheConstants: Constants.CacheConstants;
        private cacheService: Services.CacheService;
        private commonConstants: Constants.CommonConstants;
        private modalService: Services.ModalService;
        private q: ng.IQService;

        static $inject = ['httpService', 'apiConstants', 'cacheService', '$q', 'cacheConstants', 'commonConstants', 'modalService'];

        constructor(httpService: Services.HttpService, apiConstants: Constants.ApiConstants, cacheService: Services.CacheService, $q: ng.IQService, 
                    cacheConstants: Constants.CacheConstants, commonConstants: Constants.CommonConstants, modalService: Services.ModalService) {
            this.httpService = httpService;
            this.apiConstants = apiConstants;
            this.cacheService = cacheService;
            this.cacheConstants = cacheConstants;
            this.commonConstants = commonConstants;
            this.modalService = modalService;
            this.q = $q;
        }

        public Login(username: string, password: string) {
            var deferred = this.q.defer();

            this.httpService.Post(this.apiConstants.GetLoginService(), {'email': username, 'password': password})
                .then((success) => {
                    if (success.error) {
                        deferred.reject(success.message);
                    }
                    else {
                        this.cacheService.SetValue(this.cacheConstants.LOGGED_IN, this.commonConstants.TRUE);
                        deferred.resolve('Logged in');
                    }
            }, (error) => {
                this.modalService.Error('Error', 'It appears that you are offline or the server is down. Please try again later.', {});
                deferred.reject()
            })

            return deferred.promise;
        }

        public IsLoggedIn(){
            var deferred = this.q.defer();

            this.cacheService.GetCache(this.cacheConstants.LOGGED_IN)
            .then((success) => {
                if(success == this.commonConstants.TRUE){
                    deferred.resolve(true);
                }
                else{
                    deferred.reject(false);
                }
            }, function(error){
                deferred.reject(false);
            })

            return deferred.promise;
        }

        public Logout() {
            var deferred = this.q.defer();

            this.httpService.Post(this.apiConstants.GetLogoutService(), {})
            .then(() => {
                this.cacheService.SetValue(this.cacheConstants.LOGGED_IN, this.commonConstants.FALSE);
                this.cacheService.SetValue(this.cacheConstants.OAUTH_TOKEN, '');
                deferred.resolve('Logged out');
            }, () => {
                this.cacheService.SetValue(this.cacheConstants.LOGGED_IN, this.commonConstants.FALSE);
                this.cacheService.SetValue(this.cacheConstants.OAUTH_TOKEN, '');
                deferred.reject('Error contacting the server');
            })

            return deferred.promise;
        }
    }
}