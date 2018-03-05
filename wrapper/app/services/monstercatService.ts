module MobileWrapper.Services{
    'use strict'
    export class MonstercatService{
        private httpService: Services.HttpService;
        private apiConstants: Constants.ApiConstants;
        private q: ng.IQService

        static $inject = ['httpService', 'apiConstants', '$q'];

        constructor(httpService: Services.HttpService, apiConstants: Constants.ApiConstants, $q: ng.IQService) {
            this.httpService = httpService;
            this.apiConstants = apiConstants;
            this.q = $q;
        }

        public GetAlbums(id: string = '', limit: number = 10, page: number = 1){
            var deferred = this.q.defer();
            let albums: Array<{}> = [];
            let skip = (page - 1) * limit;

            let albumUrl = this.apiConstants.GetAlbumService(id);
            this.httpService.Get(albumUrl, {'limit': limit, 'skip': skip}).then((albumsInfo) => {
                if(id || limit == 1){
                    let album = albumsInfo.results == undefined ? albumsInfo : albumsInfo.results[0];
                    let albumInfo = {
                        Id: album._id,
                        ReleaseDate: album.releaseDate,
                        Name: album.title,
                        Artists: album.renderedArtists,
                        CoverUrl: album.coverUrl,
                        Type: album.featured
                    }
                    deferred.resolve(albumInfo);
                }else{
                    for(let album of albumsInfo.results){
                        let albumInfo = {
                            Id: album._id,
                            Name: album.title,
                            Artists: album.renderedArtists,
                            CoverUrl: album.coverUrl,
                            Type: album.featured
                        }
                        albums.push(albumInfo);
                    }
                    deferred.resolve(albums);
                }
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public Browse(type: string, id: string = '', limit: number = 10, page: number = 1){
            var deferred = this.q.defer();
            let podcasts: Array<{}> = [];
            let skip = (page - 1) * limit;

            let podcastUrl = this.apiConstants.GetBrowseService();
            this.httpService.Get(podcastUrl, {'types': type, 'limit': limit, 'skip': skip, 'albumId': id}).then((podcastsInfo) => {
                if(id || limit == 1){
                    let podcast = podcastsInfo.results[0].release || podcastsInfo;
                    let podcastInfo = {
                        Id: podcast._id,
                        Name: podcast.title,
                        Artists: podcast.renderedArtists,
                        CoverUrl: podcast.coverUrl
                    }
                    deferred.resolve(podcastInfo);
                }else{
                    for(let podcast of podcastsInfo.results){
                        let release = podcast.release || podcast;
                        let podcastInfo = {
                            Id: release._id,
                            Name: release.title,
                            Artists: release.renderedArtists,
                            CoverUrl: release.coverUrl
                        }
                        podcasts.push(podcastInfo);
                    }
                    deferred.resolve(podcasts);
                }
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public GetAlbumInfo(id: string){
            let deferred = this.q.defer();
            let songs:Array<{}> = [];

            let albumInfoUri = this.apiConstants.GetAlbumTracksService(id);
            this.httpService.Get(albumInfoUri, {}).then((album) => {
                for(let song of album.results){
                    let songInfo: any = {
                        SongIndex : album.results.indexOf(song),
                        Name: song.title,
                        Artists: song.artistsTitle,
                        Id: song._id,
                        StreamUrl: this.apiConstants.GetMediaService(song.albums[0].streamHash),
                        Genre: song.genre
                    }
                    songs.push(songInfo);
                }
                deferred.resolve(songs);
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public GetSongInfo(id: string){
            let deferred = this.q.defer();
            let song: any = {};

            let songInfoUrl = this.apiConstants.GetTrackService(id);
            this.httpService.Get(songInfoUrl, {}).then((songInfo) => {
                song.Id = songInfo._id;
                song.Name = songInfo.title;
                song.Artists = songInfo.artistsTitle;
                song.StreamUrl = this.apiConstants.GetMediaService(songInfo.albums[0].streamHash);
                song.Genre = songInfo.genre;
                deferred.resolve(song);
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public GetArtistInfo(vanityUri?: string, limit: number = 10, page: number = 1){
            let deferred = this.q.defer();
            let artists: Array<{}> = [];
            let skip = (page - 1) * limit;

            let artistsInfoUrl = this.apiConstants.GetArtistService(vanityUri);
            this.httpService.Get(artistsInfoUrl, {'limit': limit, 'skip': skip}).then((artistsInfo) => {
                if(vanityUri){
                    let artistInfo: any = {};
                    artistInfo.Name = artistsInfo.name;
                    artistInfo.ProfilePicture = artistsInfo.profileImageUrl;
                    artistInfo.VanityUri = artistsInfo.vanityUri;
                    artistInfo.Urls = artistsInfo.urls;
                    deferred.resolve(artistInfo);
                }else{
                    for(let artist of artistsInfo.results){
                        let artistInfo: any = {};
                        artistInfo.Name = artist.name;
                        artistInfo.ProfilePicture = artist.profileImageUrl;
                        artistInfo.VanityUri = artist.vanityUri;
                        artistInfo.Urls = artist.urls;
                        artists.push(artistInfo);
                    }
                    deferred.resolve(artists);
                }
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public GetArtistReleases(vanityUri: string, limit: number = 10){
            let deferred = this.q.defer();
            let releasesInfo: Array<{}> = [];

            let artistReleasesUri = this.apiConstants.GetArtistReleasesService(vanityUri);
            this.httpService.Get(artistReleasesUri, {'limit' : limit}).then((releases) => {
                for(let release of releases.results){
                    let releaseInfo: any = {
                        Id: release._id,
                        Name: release.title,
                        Artists: release.renderedArtists,
                        CoverUrl: release.coverUrl
                    }
                    releasesInfo.push(releaseInfo);
                }
                deferred.resolve(releasesInfo)
            }).catch((error) => {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        public GetUserPlaylists(id?: string, limit: number = 10){
            let deferred = this.q.defer()

            let userPlaylistsUrl = this.apiConstants.GetPlaylistService(id);
            this.httpService.Get(userPlaylistsUrl, {}).then((playlists) => {
                console.log(playlists)
                deferred.resolve(playlists);
                //TODO
            }).catch((error) => {
                deferred.reject(error)
            })

            return deferred.promise;
        }

        public GetUserInfo(){
            //TODO
        }
    }
}