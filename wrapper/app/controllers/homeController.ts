module MobileWrapper.Controllers {
    interface HomeScope extends ng.IScope{
        release: any;
        podcast: any;
    }

    export class HomeController {
        private scope: HomeScope;
        private commonService: Services.CommonService;
        private authService: Services.AuthService;
        private state: ng.ui.IStateService;
        private monstercatService: Services.MonstercatService;

        static $inject = ['$scope', '$state', 'commonService', 'authService', 'monstercatService'];

        constructor($scope: HomeScope, $state: ng.ui.IStateService, commonService: Services.CommonService, authService: Services.AuthService, monstercatService: Services.MonstercatService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.authService = authService;
            this.monstercatService = monstercatService;
            this.state = $state;
            this.commonService.SetMenuVisibility(true);
            this.commonService.SetToolbarText('Monstercat Connect');
            this.Setup()
        }

        private Setup(){
            this.authService.IsLoggedIn().then(() => {
                this.monstercatService.GetAlbums(undefined, 1).then((album) => {
                    this.scope.release = album;
                }).then(() => {
                    this.monstercatService.Browse('Podcast', undefined, 1).then((podcast) => {
                        this.scope.podcast = podcast;
                    }).then(() => {
                        navigator.splashscreen.hide();
                    })
                })
            },() => {
                this.commonService.Logout(this.state, this.scope);
            })
        }

        public ShowMore(type: string){
            this.commonService.NavigateToPage('featured', this.state, this.scope, {type: type});
        }

        public ViewAlbum(album: string){
            this.commonService.NavigateToPage('album', this.state, this.scope, {album: album});
        }
    }
}