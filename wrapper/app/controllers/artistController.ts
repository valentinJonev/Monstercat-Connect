module MobileWrapper.Controllers {
    interface ArtistScope extends ng.IScope{
        artistUri: string,
        artistName: string,
        artistProfilePicture: string,
        artistUrls: any,
        releases: any
    }

    export class ArtistController {
        private scope: ArtistScope;
        private commonService: Services.CommonService;
        private monstercatService: Services.MonstercatService;
        private state: ng.ui.IStateService;

        static $inject = ['$scope', '$state', '$stateParams', 'commonService', 'monstercatService'];

        constructor($scope: ArtistScope, $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService, commonService: Services.CommonService, monstercatService: Services.MonstercatService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.monstercatService = monstercatService;
            this.state = $state;
            this.scope.artistUri = $stateParams['artist']
            this.Setup();
        }

        private Setup(){
            this.monstercatService.GetArtistInfo(this.scope.artistUri).then((artist: any) => {
                this.scope.artistName = artist.Name;
                this.commonService.SetToolbarText(this.scope.artistName);
                this.scope.artistProfilePicture = artist.ProfilePicture;
                this.scope.artistUrls = artist.Urls;
                this.monstercatService.GetArtistReleases(artist.VanityUri, 15).then((releases) => {
                    this.scope.releases = releases;
                })
            })
        }

        public ViewRelease(releaseId: string){
            this.commonService.NavigateToPage('album', this.state, this.scope, {album: releaseId});
        }
    }
}