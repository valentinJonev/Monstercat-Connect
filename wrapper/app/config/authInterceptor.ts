module MobileWrapper.Config{
    export class AuthInterceptor implements ng.IHttpInterceptor{
        private cacheConstants: Constants.CacheConstants;

        static Factory(cacheConstants: Constants.CacheConstants): AuthInterceptor {
            return new AuthInterceptor(cacheConstants);
        }

        constructor(cacheConstants: Constants.CacheConstants) {
            this.cacheConstants = cacheConstants;
        }

        request = (config: ng.IRequestConfig): ng.IRequestConfig => {
            var authToken = window.localStorage.getItem(this.cacheConstants.OAUTH_TOKEN);
            
            if(authToken != undefined && authToken != ''){
                config.headers.Authorization = authToken;
            }

            return config;
        }
    }

}
