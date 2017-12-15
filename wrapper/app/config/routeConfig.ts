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
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'homeController'
      };

      var musicState = {
        name: 'music',
        url: '/music',
        templateUrl: 'views/music.html',
        controller: 'homeController'
      };

      var artistsState = {
        name: 'artists',
        url: '/artists',
        templateUrl: 'views/artists.html',
        controller: 'homeController'
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
    }
  }
}