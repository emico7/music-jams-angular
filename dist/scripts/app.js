(function() {
    function config($stateProvider, $locationProvider) {

      console.log("app loaded");
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/collection.html'
            });
  }
  
  angular
      .module('musicJams', ['ui.router'])
      .config(config);
})();
