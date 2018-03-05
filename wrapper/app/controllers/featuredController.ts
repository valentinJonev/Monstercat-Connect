module MobileWrapper.Controllers {
    interface FeaturedScope extends ng.IScope{
        type: string;
        latest: any;
        albums: any;
    }

    export class FeaturedController {
        private scope: FeaturedScope;
        private commonService: Services.CommonService;
        private monstercatService: Services.MonstercatService;
        private state: ng.ui.IStateService;

        static $inject = ['$scope', '$state', '$stateParams', 'commonService', 'monstercatService'];

        constructor($scope: FeaturedScope, $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService, commonService: Services.CommonService, monstercatService: Services.MonstercatService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.monstercatService = monstercatService;
            this.state = $state;
            this.scope.type = $stateParams['type'];
            this.Setup();
        }

        private Setup(){
            if(this.scope.type == 'Albums'){
                this.commonService.SetToolbarText('Featured');
                this.monstercatService.Browse('Single, EP, Album', undefined, 4).then((albums: Array<any>) => {
                    let featured = albums[0];
                    this.scope.latest = featured;
                    this.scope.albums = albums.filter(album => album.Id != featured.Id);
                })
            }
            else{
                this.commonService.SetToolbarText(this.scope.type);
                this.monstercatService.Browse('Podcast', undefined, 4).then((podcasts: Array<any>) => {
                    let latest = podcasts[0];
                    this.scope.latest = latest;
                    this.scope.albums = podcasts.filter(album => album.Id != latest.Id);
                })
            }
        }

        public ViewRelease(releaseId: string){
            this.commonService.NavigateToPage('album', this.state, this.scope, {album: releaseId});
        }
    }
}