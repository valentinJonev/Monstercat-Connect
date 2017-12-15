module MobileWrapper.Services {
    'use strict'

    export class CacheService { 
        private q: ng.IQService;
        private cacheConstants: Constants.CacheConstants;
        private httpService: Services.HttpService;
        private apiConstants: Constants.ApiConstants;

        public Template: any;;
        public Widget: any;
        public Update: any;
        public Server: any;
        public MenuItem: any;

        $inject = ['$q', 'cacheConstants', 'httpService', 'apiConstants'];

        constructor($q: ng.IQService, cacheConstants: Constants.CacheConstants, httpService: Services.HttpService, apiConstants: Constants.ApiConstants) {
            this.q = $q;
            this.cacheConstants = cacheConstants;
            this.httpService = httpService;
            this.apiConstants = apiConstants;
            this.Setup();
        }

        Setup = () => {
            this.Template = persistence.define('Template', {
                name: 'TEXT',
                html: 'TEXT',
                version: 'TEXT'
            });

            this.Widget = persistence.define('Widget', {
                name: 'TEXT',
                params: 'TEXT'
            });

            this.Update = persistence.define('Update', {
                message: 'TEXT',
                version: 'TEXT',
                optional: 'BOOL'
            });

            this.Server = persistence.define('Server', {
                name: 'TEXT',
                url: 'TEXT',
                postfix: 'TEXT',
                authToken: 'TEXT',
                current: 'BOOL'
            });

            this.MenuItem = persistence.define('MenuItem', {
                key: 'TEXT',
                label: 'TEXT',
                url: 'TEXT',
                parameters: 'TEXT',
                method: 'TEXT'
            })

            persistence.schemaSync();
        }

        public Add(model: any){
            persistence.add(model);

            persistence.transaction(function(tx) {
                persistence.flush(tx, function() {
                    //console.log('Changes saved!');
                });
            });
        }

        public Save(){
            persistence.transaction(function(tx) {
                persistence.flush(tx, function() {
                    //console.log('Changes saved!');
                });
            });
        }

        public Delete(model: any){
            persistence.remove(model);

            persistence.transaction(function(tx) {
                persistence.flush(tx, function() {
                    //console.log('Changes saved!');
                });
            });
        }

        public GetTemplate(name: string){
            var deferred = this.q.defer();

            var template = this.Template.all().filter('name', '=', name);

            template.one(null, (temp) => {
                deferred.resolve(temp);
            })

            return deferred.promise;
        }

        public GetServer(option: string = 'name', value: any = ''){
            var deferred = this.q.defer();

            var serversList = this.Server.all();

            if(value != ''){
                serversList.filter(option, '=', value).one(null, (server) => {
                    deferred.resolve(server);
                })
            }
            else{
                serversList.list(null, (servers) => {
                    if(servers.length != 0){
                        deferred.resolve(servers);
                    }
                    else{
                        deferred.reject()
                    }
                })
            }

            return deferred.promise;
        }

        public GetWidget(name: string = ''){
            var deferred = this.q.defer();

            var widgetsList = this.Widget.all();

            if(name != ''){
                widgetsList.filter('name', '=', name).one(null, (widget) => {
                    deferred.resolve(widget);
                })
            }
            else{
                widgetsList.list(null, (widgets) => {
                    if(widgets.length != 0)
                    {
                        deferred.resolve(widgets);
                    }
                    else{
                        deferred.reject();
                    }
                })
            }

            return deferred.promise;
        }

        public DeleteAllWidgets(){
            var deferred = this.q.defer();

            this.Widget.all().destroyAll(null, () => {
                deferred.resolve();
            })

            return deferred.promise;
        }

        public GetUpdate(){
            var deferred = this.q.defer();

            var update = this.Update.all();

            update.one(null, (temp) => {
                deferred.resolve(temp);
            })

            return deferred.promise;
        }

        public GetMenuItem(key: string = ''){
            var deferred = this.q.defer();

            var menuItemsList = this.MenuItem.all();

            if(key != ''){
                menuItemsList.filter('key', '=', key).one(null, (menuItem) => {
                    deferred.resolve(menuItem);
                })
            }
            else{
                menuItemsList.list(null, (menuItems) => {
                    deferred.resolve(menuItems);
                })
            }

            return deferred.promise;
        }

        public DeleteAllMenuItems(){
            var deferred = this.q.defer();

            this.MenuItem.all().destroyAll(null, () => {
                deferred.resolve();
            })

            return deferred.promise;
        }

        public GetCache(name: string): ng.IPromise<string>{
            var deferred = this.q.defer<string>();

            var cache = window.localStorage.getItem(name);
            if(cache != null && cache != ''){
                deferred.resolve(cache);
            }
            else{
                deferred.reject();
            }

            return deferred.promise;
        }

        public GetAuthToken(){
            return window.localStorage.getItem(this.cacheConstants.OAUTH_TOKEN);
        }

        public SetValue(key: string, value: string){
            window.localStorage.setItem(key, value);
        }
    }
}