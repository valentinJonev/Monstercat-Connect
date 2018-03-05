module MobileWrapper.Controllers {

    export interface IndexScope extends ng.IScope{
        menu: string | null;
        mySplitter: any;
        appName: string;
        state: string,
        songId: string,
        songImage: string
    }

    export class IndexController
    {
        private scope: IndexScope;
        private commonService: Services.CommonService;
        private templateConstants: Constants.TemplateConstants;
        private state: ng.ui.IStateService;
        private commonConstants: Constants.CommonConstants;
        private monstercatService: Services.MonstercatService;

        static $inject = ['$scope', 'commonService', '$state', 'templateConstants', 'commonConstants', 'monstercatService'];
        
        constructor($scope: IndexScope, commonService: Services.CommonService, $state: ng.ui.IStateService, 
                    templateConstants: Constants.TemplateConstants, commonConstants: Constants.CommonConstants, monstercatService: Services.MonstercatService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.templateConstants = templateConstants;
            this.commonConstants = commonConstants;
            this.state = $state;
            this.commonService.SetMenuVisibility(false);
            this.scope.appName = this.commonConstants.APP_NAME;
            this.monstercatService = monstercatService;
            $('.audio-player.minimized p').on('click', (event) => {
                mySplitter.right.open();
            })
        }

        public SetPage(page: string, params: any = '') {
            this.commonService.NavigateToPage(page, this.state, this.scope, params)
        }

        public RefreshMenu() {
            this.commonService.ReloadMenu();
        }

        public Logout(){
            this.commonService.Logout(this.state, this.scope);
        }

        public PlaySong(songId, songCover){
            this.scope.songId = songId;
            this.scope.songImage = songCover;
        }
    }
}