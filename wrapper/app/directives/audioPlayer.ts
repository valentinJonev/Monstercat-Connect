module MobileWrapper.Directives {
  'use strict';

  export interface IAudioPlayerScope extends ng.IScope{
    state: string;
    message: string;
    songName: string;
    songId: string;
    streamUrl: string;
    songCover: string;
    artist: string;
    playing: boolean;
    Previous: Function;
    PlayStop: Function;
    Next: Function;
  }

  export class AudioPlayer implements ng.IDirective{
    private monstercatService: Services.MonstercatService;
    private q: ng.IQService;
    private context: AudioContext;
    private audioService: Services.AudioService;
    private source: MediaElementAudioSourceNode;
    private currentTime;
    private audio: HTMLAudioElement;
    private rootScope: Config.IRootScope;

    constructor(monstercatService: Services.MonstercatService, $q: ng.IQService, audioService: Services.AudioService, $rootScope: Config.IRootScope) {
      this.monstercatService = monstercatService;
      this.audioService = audioService;
      this.rootScope = $rootScope;
      this.q = $q;
      this.audio = this.audioService.GetAudio();
      //$(document).ready(() => {
       // this.InitEqualizer(this.audioService.GetAudio());
      //})
    }

    public templateUrl = (elem, attr) =>{
      return 'views/player-' + attr.state + '.html';
    };

    public link = (scope: IAudioPlayerScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
      scope.Previous = () =>{
        this.audioService.Previous();
      } 
      scope.PlayStop = () => {
        if(this.audioService.loadedSong){
          if(scope.playing){
            this.audioService.Pause();
            MusicControls.updateIsPlaying(false, () => {}, () => {})
            scope.playing = false;
          }
          else{
            this.audioService.Play();
            MusicControls.updateIsPlaying(true, () => {}, () => {})
            scope.playing = true;
          }
        }
        else if(scope.songId){
          this.audioService.Play(scope.songId);
          scope.playing = true;
        }
      }
      scope.Next = () => {
        this.audioService.Next();
      }
      let songId = localStorage.getItem('lastPlayed');
      scope.songCover = localStorage.getItem('lastCover');
      this.LoadSong(songId, scope);
      this.rootScope.$watch('playerSongCover', () => {
        if(this.rootScope.playerSongCover){
          scope.songCover = this.rootScope.playerSongCover;
          localStorage.setItem('lastCover', scope.songCover);
        }
      }, true)
      this.rootScope.$watch('playerSongId', () => {
        this.LoadSong(this.rootScope.playerSongId, scope).then(() => {
          scope.playing = true;
        });
      }, true)

      this.audio.ontimeupdate = () => {
        $('.progress-bar').width((this.audio.currentTime/this.audio.duration)*100 + '%');
      }

      this.audio.onpause = () => {
        scope.playing = false;
        MusicControls.updateIsPlaying(false, () => {}, () => {})
      }

      this.audio.onplay = () => {
        scope.playing = true;
        MusicControls.updateIsPlaying(true, () => {}, () => {})
      }

      this.audio.onended = () => {
        scope.playing = false;
        MusicControls.updateIsPlaying(false, () => {}, () => {})
        this.audioService.Next();
      }
    }

    private LoadSong(songId, scope: IAudioPlayerScope){
      var deferred = this.q.defer();

      this.monstercatService.GetSongInfo(songId).then((song: any) => {
        localStorage.setItem('lastPlayed', songId);
        scope.message = song.Name;
        scope.songName = song.Name;
        scope.streamUrl = song.StreamUrl;
        scope.songId = songId;
        scope.artist = song.Artists;
        this.audioService.AddToPlaylist(song);

        MusicControls.destroy(() => {}, () => {});

        MusicControls.create({
          track       : song.Name,		// optional, default : ''
          artist      : song.Artists,						// optional, default : ''
          isPlaying   : false,							// optional, default : true
          dismissable : false,							// optional, default : false
          cover: scope.songCover + "?image_width=256",
          // hide previous/next/close buttons:
          hasNext   : true,		// show next button, optional, default: true
          hasClose  : false,		// show close button, optional, default: false,
          pauseIcon  : 'ic_pause_black_24dp',
          playIcon   : 'ic_play_arrow_black_24dp',
          prevIcon   : 'ic_skip_previous_black_24dp',
          nextIcon   : 'ic_skip_next_black_24dp'
        }, () => {
          MusicControls.subscribe((action) => {
            const message = JSON.parse(action).message;

            switch(message) {
              case 'music-controls-next':
                this.audioService.Next();
                break;
              case 'music-controls-previous':
                this.audioService.Previous();
                break;
              case 'music-controls-pause':
                this.audioService.Pause();
                scope.$apply((scope: IAudioPlayerScope) => {
                  scope.playing = false;
                })
                MusicControls.updateIsPlaying(false, () => {}, () => {})
                break;
              case 'music-controls-play':
                this.audioService.Play();
                scope.$apply((scope: IAudioPlayerScope) => {
                  scope.playing = true;
                })
                MusicControls.updateIsPlaying(true, () => {}, () => {})
                break;
              default:
                break;
            }
          });

          MusicControls.listen();
        }, (error) => {
          console.log(error);
        });

        deferred.resolve();
      })

      return deferred.promise;
    }

    private PlaySong(id){
      this.audioService.Play(id);  
    }

    private InitEqualizer(audio){
      var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');
      this.context = new AudioContext();
      this.source = this.context.createMediaElementSource(audio);
      this.source.connect(this.context.destination);

      var analyser = this.context.createAnalyser();
      analyser.fftSize = 512;

      this.source.connect(analyser);
      
      var bufferLength = analyser.frequencyBinCount;
      
      var freqData = new Uint8Array(analyser.frequencyBinCount);

      var width = canvas.width;
      var height = canvas.height;

      var barWidth = (width / bufferLength) * 2.5;
      var barHeight;
      var x = 0;

      setInterval(() => {

        analyser.getByteFrequencyData(freqData);

        x = 0;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, width, height);

        for (var i = 0; i < bufferLength; i++) {
          barHeight = freqData[i] / 2;
          
          var b = barHeight + (25 * (i/bufferLength)) + 30;
          var g = (250 * (i/bufferLength)) - 200;
          var r = 13;
          
          ctx.fillStyle = "rgb(" + 33 + "," + 150 + "," + 243 + ")";
          ctx.fillRect(x, height - (barHeight), barWidth, barHeight);
  
          x += barWidth + 1;
        }
      }, 33);
    };

    public static Factory(): ng.IDirectiveFactory{
      var directive = (monstercatService: Services.MonstercatService, $q: ng.IQService, audioService: Services.AudioService, $rootScope: Config.IRootScope) => new AudioPlayer(monstercatService, $q, audioService, $rootScope);
      directive.$inject = ['monstercatService', '$q', 'audioService', '$rootScope'];

      return directive;
    }
  }
}