module MobileWrapper.Services{
    export class TemplatingService{
        private httpService: Services.HttpService;
        private apiConstants: Constants.ApiConstants;
        private cacheService: Services.CacheService;
        private q: ng.IQService;

        static $inject = ['httpService', 'apiConstants', 'cacheService', '$q'];

        constructor(httpService: Services.HttpService, apiConstants: Constants.ApiConstants, cacheService: Services.CacheService, $q: ng.IQService) {
            this.httpService = httpService;
            this.apiConstants = apiConstants;
            this.cacheService = cacheService;
            this.q = $q;
        }

        public ParseTemplate(templateHtml: string, params: any){
            Mustache.parse(templateHtml);
            return Mustache.render(templateHtml, params);
        }

        /*private DownloadTemplate(name: string){
            var deferred = this.q.defer();

            this.httpService.Get(this.apiConstants.GetCacheService() + name, {})
            .then((template) => {
                var temp = new this.cacheService.Template({
                    name: name,
                    html: template,
                    version: '0.0.1'
                });
                this.cacheService.Add(temp);
                deferred.resolve(temp);
            }, (error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }*/

        public GetTemplate(name: string, params: any){
            var deferred = this.q.defer();

            this.cacheService.GetTemplate(name)
            .then((template: any) => {
                if(template){
                    var html = this.ParseTemplate(template.html, params);
                    deferred.resolve(html);
                }
                else{
                    this.httpService.Get(`http://127.0.0.1:8080/views/${name}`, {})
                    .then((template: any) => {
                        var html = this.ParseTemplate((template.html || template), params);
                        deferred.resolve(html);
                    }, (error) => {
                        deferred.reject(error);
                    })
                }
            })

            return deferred.promise;
        }
    }
}