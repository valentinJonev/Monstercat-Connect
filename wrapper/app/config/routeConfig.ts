module MobileWrapper.Config{

  export class RouteConfig{
    private stateProvider: ng.ui.IStateProvider;
    private urlRouterProvider: ng.ui.IUrlRouterProvider;

    static $inject = ['$stateProvider', '$urlRouterProvider'];

    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      this.stateProvider = $stateProvider;
      this.urlRouterProvider = $urlRouterProvider;

      this.configureRoutes();
    }

    private configureRoutes = () => {
      var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeController'
      };

      var musicState = {
        name: 'music',
        url: '/music/:page',
        templateUrl: 'views/music.html',
        controller: 'musicController'
      };

      var albumState = {
        name: 'album',
        url: '/album/:album',
        templateUrl: 'views/album.html',
        controller: 'albumController'
      };

      var artistsState = {
        name: 'artists',
        url: '/artists/:page',
        templateUrl: 'views/artists.html',
        controller: 'artistsController'
      };

      var featuredState = {
        name: 'featured',
        url: '/featured/:type',
        templateUrl: 'views/featured.html',
        controller: 'featuredController'
      };

      var artistState = {
        name: 'artist',
        url: '/artist/:artist',
        templateUrl: 'views/artist.html',
        controller: 'artistController'
      };

      var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'
      };

      var settingsState = {
        name: 'settings',
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'settingsController',
        controllerAs: 'settings'
      };

      this.stateProvider.state(homeState);
      this.stateProvider.state(musicState);
      this.stateProvider.state(artistsState);
      this.stateProvider.state(loginState);
      this.stateProvider.state(settingsState);
      this.stateProvider.state(albumState);
      this.stateProvider.state(artistState);
      this.stateProvider.state(featuredState);
      this.urlRouterProvider.when('', '/home')
    }
  }
}