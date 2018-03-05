module MobileWrapper.Services{
    export class AudioService{
        private audio: HTMLAudioElement;
        private playlist: Array<any>;
        private current: number;
        public loadedSong: boolean;
        private rootScope: Config.IRootScope;

        static $inject = ['$rootScope']

        constructor($rootScope: Config.IRootScope) {
            this.audio = new Audio();
            this.playlist = new Array<any>();
            this.loadedSong = false;
            this.rootScope = $rootScope;
        }

        public AddToPlaylist(song: any){
            if(this.playlist.filter(playlistSong => playlistSong.Id == song.Id).length == 0)
                this.playlist.push(song);
        }

        public ResetPlaylist(){
            this.playlist = new Array<any>(); 
        }

        public Play(id?: string){
            if(id){
                this.loadedSong = true;
                let song = this.playlist.filter(song => song.Id == id)[0];
                this.current = this.playlist.indexOf(song);
                this.rootScope.playerSongId = song.Id;
                this.audio.src = song.StreamUrl;
            }
            this.audio.play();
        }

        public Next(){
            if(this.current < (this.playlist.length - 1)){
                this.current++;
            }
            else{
                this.current = 0;
            }
            var song = this.playlist[this.current];
            this.Play(song.Id);
        }

        public Previous(){
            if(this.current != 0){
                if(this.audio.currentTime < 15){
                    this.current--;
                    var song = this.playlist[this.current];
                    this.Play(song.Id);
                }
                else{
                    this.audio.currentTime = 0;
                }
            }
            else{
                this.audio.currentTime = 0;
            }
        }

        public Pause(){
            this.audio.pause();
        }

        public GetAudio(){
            return this.audio;
        }

        //Play/pause song? (Use HTML5 audio attrib in directive)
        //Download
        //Get song info (Name, Artists, Length, Ganre, Picture)
    }
}