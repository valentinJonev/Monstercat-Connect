module MobileWrapper.Controllers {
    interface AlbumScope extends ng.IScope{
        albumId: string,
        albumName: string,
        albumCoverUrl: string,
        albumArtists: string,
        releaseDate: string;
        songs: any
    }

    export class AlbumController {
        private scope: AlbumScope;
        private commonService: Services.CommonService;
        private monstercatService: Services.MonstercatService;
        private audioService: Services.AudioService;
        private rootScope: Config.IRootScope;

        static $inject = ['$scope', '$stateParams', 'commonService', 'monstercatService', 'audioService', '$rootScope'];

        constructor($scope: AlbumScope, $stateParams: ng.ui.IStateParamsService, commonService: Services.CommonService, monstercatService: Services.MonstercatService,
                    audioService: Services.AudioService, $rootScope: Config.IRootScope) {
            this.scope = $scope;
            this.commonService = commonService;
            this.commonService.SetMenuVisibility(true);
            this.monstercatService = monstercatService;
            this.rootScope = $rootScope;
            this.audioService = audioService;
            this.scope.albumId = $stateParams['album']
            this.Setup();
        }

        private Setup(){
            this.monstercatService.GetAlbums(this.scope.albumId).then((album: any) => {
                this.scope.albumName = album.Name;
                this.commonService.SetToolbarText(this.scope.albumName);
                this.scope.albumCoverUrl = album.CoverUrl;
                this.scope.releaseDate = moment(album.ReleaseDate).format('MMMM D, YYYY');
                this.scope.albumArtists = album.Artists;
                this.monstercatService.GetAlbumInfo(album.Id).then((songs) => {
                    this.scope.songs = songs;
                })
            })
        }

        public PlaySong(songIndex: string){
            this.audioService.ResetPlaylist();
            for(var song of this.scope.songs){
                this.audioService.AddToPlaylist(song);
            }
            this.rootScope.playerSongCover = this.scope.albumCoverUrl;
            var songId = this.scope.songs[songIndex].Id;
            this.audioService.Play(songId);
        }
    }
}