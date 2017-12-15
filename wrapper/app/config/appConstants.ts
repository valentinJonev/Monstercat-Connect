module MobileWrapper.Constants {
    export class ApiConstants{

        constructor() {
            this.configure();
        }

        private configure(){
            this.API_URL = 'https://connect.monstercat.com/api';
            this.MEDIA_URL = 'https://s3.amazonaws.com';
        }

        public API_URL;
        private MEDIA_URL;

        private LOGIN_SERVICE = '/signin';
        private LOGOUT_SERVICE = '/signout'
        private ALBUM_SERVICE = '/catalog/release/';
        private TRACK_SERVICE = '/catalog/track/';
        private PLAYLIST_SERVICE = '/playlist';
        private ARTIST_SERVICE = '/catalog/artist';
        private MEDIA_SERVICE = '/data.monstercat.com/blobs/';
        private SESSION_SERVICE = '/self/session/';
        
        /*private LOGOUT_SERVICE = '/imp/login/logout';
        private CACHE_SERVICE = '/imp/template/get/';
        private UPDATE_SERVICE = '/imperia/';
        private UPDATE_VERSION_SERVICE = '/imp/updater/version'
        private DASBOARD_SERVICE = '/imp/remote_dashboard/';
        private MENU_ITEMS_SERVICE = '/imp/remote_dashboard/menu_items'
        */

        public GetLoginService(){
            return this.API_URL + this.LOGIN_SERVICE;
        }

        public GetLogoutService(){
            return this.API_URL + this.LOGOUT_SERVICE;
        }

        public GetAlbumService(albumID: string = ''){
            return this.API_URL + this.ALBUM_SERVICE + albumID;
        }

        public GetAlbumTracksService(albumID: string){
            return this.API_URL + this.ALBUM_SERVICE + albumID + '/tracks';
        }

        public GetTrackService(trackID: string = ''){
            return this.API_URL + this.TRACK_SERVICE + trackID;
        }

        public GetPlaylistService(playlistID: string = ''){
            return this.API_URL + this.PLAYLIST_SERVICE + playlistID;
        }

        public GetArtistService(artistID: string = ''){
            return this.API_URL + this.ARTIST_SERVICE + artistID
        }

        public GetArtistReleasesService(artistID: string){
            return this.API_URL + this.ARTIST_SERVICE + artistID + '/releases';
        }

        public GetMediaService(trackStreamHash: string){
            return this.MEDIA_URL + this.MEDIA_SERVICE + trackStreamHash;
        }

        public GetSessionService(){
            return this.API_URL + this.SESSION_SERVICE;
        }

        /*
        public GetLogoutService(){
            return this.API_URL + this.LOGOUT_SERVICE;
        }

        public GetCacheService(){
            return this.API_URL + this.CACHE_SERVICE;
        }

        public GetUpdateService(){
            return this.API_URL + this.UPDATE_SERVICE;
        }

        public GetUpdateVersionService(){
            return this.API_URL + this.UPDATE_VERSION_SERVICE;
        }

        public GetDashboardService(method: string){
            return this.API_URL + this.DASBOARD_SERVICE + method;
        }

        public GetMenuItemsService(){
            return this.API_URL + this.MENU_ITEMS_SERVICE;
        }

        public SetServerUrl(serverUrl: string){
            this.API_URL = serverUrl;
            window.localStorage.setItem('serverUrl', serverUrl);
        }
        */
    }

    export class TemplateConstants{
        public LOGIN_TEMPLATE = 'login';
        public MENU_TEMPLATE = 'menu';
        public HOME_TEMPLATE = 'test';
        public ERROR_TEMPLATE = 'error';
        public INFO_TEMPLATE = 'info';
        public DASHBOARD_TEMPLATE = 'widget';
        public SETTINGS_TEMPLATE = 'settings'
    }

    export class CacheConstants{
        public OAUTH_TOKEN = 'oauthToken';
        public LOGGED_IN = 'loggedIn';
    }

    export class CommonConstants{
        public TRUE = 'true';
        public FALSE = 'false';
        public APP_LOGO = 'misc/images/logo.png';
        public APP_NAME = 'Monstercat Connect'
    }
}