module MobileWrapper.Services{

    import Services = MobileWrapper.Services;

    export class CommonService{
        private templateService: Services.TemplatingService;
        private cacheService: Services.CacheService;
        private authService: Services.AuthService;
        private modalService: Services.ModalService;
        private httpService: Services.HttpService;
        private apiConstants: Constants.ApiConstants;
        private rootScope: Config.IRootScope;
        private q: ng.IQService;
        private templateConstants: Constants.TemplateConstants;
        private menuLoaded: boolean;

        static $inject = ['templatingService', 'cacheService', '$q', 'authService', 'modalService', 'httpService', 'apiConstants', 
                        'templateConstants', '$rootScope'];

        constructor(templatingService: Services.TemplatingService, cacheSevice: Services.CacheService, $q: ng.IQService, authService: Services.AuthService, 
                    modalService: Services.ModalService, httpService: Services.HttpService, apiConstants: Constants.ApiConstants, 
                    templateConstants: Constants.TemplateConstants, $rootScope: Config.IRootScope) {
            this.templateService = templatingService;
            this.cacheService = cacheSevice;
            this.authService = authService;
            this.modalService = modalService;
            this.httpService = httpService;
            this.apiConstants = apiConstants;
            this.templateConstants = templateConstants;
            this.rootScope = $rootScope;
            this.q = $q;
            this.menuLoaded = false;
        }

        public SetMenuVisibility(visibility: boolean){
            if(visibility){
                $('.toolbar-button').show();
                $('.menu-slide').attr('swipeable', 'true');
                $('audio-player').show();
            } else{
                $('.toolbar-button').hide();
                $('.menu-slide').removeAttr('swipeable');
                $('audio-player').hide();
            }
        }

        public SetToolbarText(text: string){
            $('.toolbar-text p').text(text);
        }

        public NavigateToPage(page: string, $state: ng.ui.IStateService, scope: any, params: any = '') {
            var deferred = this.q.defer();
            this.authService.IsLoggedIn()
            .then(()=>{
                $state.go(page , params)
                .then(function(success){
                    scope.mySplitter.left.close();
                    deferred.resolve();
                }, (error) => {
                    this.modalService.Error('Error loading page', error, {});
                    scope.mySplitter.left.close();
                    console.log(error);
                    deferred.reject();
                });
            },(error) => {
                $state.go('login')
                .then(function(success){
                    scope.mySplitter.left.close();
                    deferred.resolve();
                }, (error) => {
                    this.modalService.Error('Error loading the page', error, {});
                    scope.mySplitter.left.close();
                    console.log(error);
                    deferred.reject();
                });
            })

            return deferred.promise;
        }

        public LoadTemplate(page: string, params: any): ng.IPromise<string>{
            var deferred = this.q.defer<string>();

            this.templateService.GetTemplate(page, params)
            .then((html: string) => {
                deferred.resolve(html);
            }, (error) => {
                this.modalService.Error('Error loading the resource', error, {});
                deferred.reject('');
            })
            
            return deferred.promise;
        }

        public GetData(service: string, method: string, data: any){
            var deferred = this.q.defer();

            this.httpService.Get(service + method, data)
            .then((success) => {
                deferred.resolve(success);
            }, (error) => {
                this.modalService.Error('Error loading the resource', error, {});
                deferred.reject('');
            })

            return deferred.promise;
        }

        public Logout(state: ng.ui.IStateService, scope: any) {
            this.authService.Logout()
            .then(() => {
                this.NavigateToPage('login', state, scope);
            }, () => {
                this.NavigateToPage('login', state, scope);
            })
        }

        public ReloadMenu(){
                this.LoadTemplate(this.templateConstants.MENU_TEMPLATE, {})
                .then((menu) => {
                    this.rootScope.menu = menu;
                }, (error) => {
                    this.modalService.Error('Error', 'Error loading the menu', {});
                    this.rootScope.menu = ` <div class="page__content">
                                                <ons-list>
                                                    <div>
                                                        <ons-list-item class="firstMenuItem" style="margin-top: 70%; text-align: center">
                                                            <div style="width: 90%">
                                                                <i class="zmdi zmdi-alert-triangle zmdi-hc-3x" style="color: red;"></i>
                                                            </div>
                                                        </ons-list-item>
                                                        <ons-list-item style="text-align: center">
                                                            <div style="width: 90%">
                                                                Error loading the menu
                                                            </div>
                                                        </ons-list-item>
                                                        <ons-list-item style="text-align: center">
                                                            <div style="width: 90%">
                                                                <button class="btn" type="button" ng-click="index.RefreshMenu()">Refresh</button>
                                                            </div>
                                                        </ons-list-item>
                                                    </div>
                                                </ons-list>
                                            </div>`;
                })
            
        }
    }
}