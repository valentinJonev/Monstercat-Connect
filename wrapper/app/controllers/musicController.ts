module MobileWrapper.Controllers {
    interface MusicScope extends ng.IScope{
        releases: any
    }

    export class MusicController {
        private scope: MusicScope;
        private commonService: Services.CommonService;
        private monstercatService: Services.MonstercatService;
        private state: ng.ui.IStateService;
        private page: number;
        private loadingMore: boolean;

        static $inject = ['$scope', '$state', 'commonService', 'monstercatService', '$stateParams'];

        constructor($scope: MusicScope, $state: ng.ui.IStateService, commonService: Services.CommonService, monstercatService: Services.MonstercatService, $stateParams: ng.ui.IStateParamsService) {
            this.scope = $scope;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.commonService.SetToolbarText('Releases');
            this.page = $stateParams['page'];
            this.monstercatService = monstercatService;
            this.state = $state;
            this.loadingMore = false;
            $('.loading-more').hide();
            this.Setup();
        }

        private Setup(){
            this.monstercatService.GetAlbums(undefined, 15, this.page).then((albums) => {
                this.scope.releases = albums;
            })

            $('.releases').on('scroll', function() {
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
            this.monstercatService.GetAlbums(undefined, 15, this.page).then((albums: any) => {
                for(let album of albums){
                    this.scope.releases.push(album);
                }
                $('.loading-more').hide();
                this.loadingMore = false;
            })
        }

        public ViewAlbum(album: string){
            this.commonService.NavigateToPage('album', this.state, this.scope, {album: album});
        }
    }
}