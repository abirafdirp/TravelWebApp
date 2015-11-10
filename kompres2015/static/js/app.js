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
        templateUrl: '/home/',
        controller: 'HomePageCtrl',
        activetab: 'home'
      }).
      when('/artikel', {
        templateUrl: '/article/',
        controller: 'ArticlesCtrl',
        activetab: 'article'
      }).
      when('/lokasi-wisata', {
        templateUrl: '/travel-destination-list/',
        controller: 'TravelDestinationsCtrl',
        activetab: 'travel-destination'
      }).
      when('/lokasi-wisata/:travel_destination_name', {
        templateUrl: '/travel-destination-detail/',
        controller: 'TravelDestinationsCtrl',
        activetab: 'travel-destination',
        travel_destination_name: function (params) {return params.travel_destination_name}
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

