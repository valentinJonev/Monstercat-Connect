module MobileWrapper.Controllers {
    interface ArtistsScope extends ng.IScope{
        artistsList: any
    }

    export class ArtistsController {
        private scope: ArtistsScope;
        private commonService: Services.CommonService;
        private monstercatService: Services.MonstercatService;
        private state: ng.ui.IStateService;
        private page: number;
        private loadingMore: boolean;

        static $inject = ['$scope', '$state', 'commonService', 'monstercatService', '$stateParams'];

        constructor($scope: ArtistsScope, $state: ng.ui.IStateService, commonService: Services.CommonService, monstercatService: Services.MonstercatService, $stateParams: ng.ui.IStateParamsService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.commonService.SetToolbarText('Artists');
            this.page = $stateParams['page'];
            this.monstercatService = monstercatService;
            this.state = $state;
            this.loadingMore = false;
            $('.loading-more').hide();
            this.Setup();
        }

        private Setup(){
            this.monstercatService.GetArtistInfo(undefined, 15, this.page).then((artists) => {
                this.scope.artistsList = artists;
            })

            $('.artists').on('scroll', function() {
                var scrollTop = $(this).scrollTop();
                if (scrollTop + $(this).innerHeight() >= this.scrollHeight - 100) {
                    if(!_this.loadingMore){
                        _this.loadingMore = true;
                        $('.loading-more').show();
                        _this.LoadNextPage();
                    }
                }
            });
        }

        public LoadNextPage(){
            this.page++;
            this.monstercatService.GetArtistInfo(undefined, 15, this.page).then((artists: any) => {
                for(let artist of artists){
                    this.scope.artistsList.push(artist);
                }
                $('.loading-more').hide();
                this.loadingMore = false
            })
        }

        public ViewArtist(vanityUri: string){
            this.commonService.NavigateToPage('artist', this.state, this.scope, {artist: vanityUri});
        }
    }
}   