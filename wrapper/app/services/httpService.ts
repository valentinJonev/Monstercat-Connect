module MobileWrapper.Services{
    'use strict'

    export class HttpService{
        private http: ng.IHttpService;
        private q: ng.IQService;

        static $inject = ['$http', '$q'];

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.http = $http;
            this.q = $q;
        }
        private jsonToQueryString(json) {
            return Object.keys(json).map(function(key) {
                    return encodeURIComponent(key) + '=' +
                        encodeURIComponent(typeof json[key] == "object" ? JSON.stringify(json[key]): json[key]);
                }).join('&');
        }

        public Get(url: string, params: any, accept: string = '*/*'): ng.IPromise<any>{
            var deferred = this.q.defer();
            var headers = new Headers();

            headers.append('Accept', accept);
            if(window.localStorage.getItem('oauthToken') != "" && window.localStorage.getItem('oauthToken') != ""){
                headers.append('Authorization', window.localStorage.getItem('oauthToken'));
            }
            fetch(`${url}?${this.jsonToQueryString(params)}`, {
                method: 'get',
                headers: headers
            }).then((response) => {
                response.text().then((data) => {
                    try {
                        deferred.resolve(JSON.parse(data))
                    }
                    catch (e){
                        deferred.resolve(data)
                    }
                })
            }, (error) => {
                deferred.reject(error);
            })
            
            return deferred.promise;
        }

        public Post(url: string, params: any, accept: string = '*/*'): ng.IPromise<any>{
            var deferred = this.q.defer();
            var headers = new Headers();

            headers.append('Accept', accept);
            headers.append('Content-Type', 'application/json');
            if(window.localStorage.getItem('oauthToken') != "" && window.localStorage.getItem('oauthToken') != ""){
                headers.append('Authorization', window.localStorage.getItem('oauthToken'));
            }

            fetch(url, {
                body: JSON.stringify(params),
                method: 'post',
                headers: headers
            }).then(function(response){
                response.text().then((data) => {
                    try {
                        deferred.resolve(JSON.parse(data))
                    }
                    catch (e){
                        deferred.resolve(data)
                    }
                })
            }, (error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }
    }
}