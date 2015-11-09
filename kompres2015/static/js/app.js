var kompresApp = angular.module('kompres', [
  'ngRoute',
  'kompresControllers',
  'ui.bootstrap',
  'kompresServices',
  'angularUtils.directives.dirPagination'
]);

kompresApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

kompresApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/',
        controller: 'HomePageCtrl',
        activetab: 'home'
      }).
      when('/artikel', {
        templateUrl: 'artikel',
        controller: 'HomePageCtrl',
        activetab: 'home'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  }
]);

kompresApp.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }]);

