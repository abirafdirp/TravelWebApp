var kompresApp = angular.module('kompres', [
  'ngRoute',
  'kompresControllers',
  'ui.bootstrap',
  'kompresServices',
  'hateoas'
]);



// hateoas enabler
kompresApp.config(function (HateoasInterceptorProvider) {
    HateoasInterceptorProvider.transformAllResponses();
});

// differentiate angular and django template language
kompresApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

kompresApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/home/',
        activetab: 'home'
      }).
      when('/artikel', {
        templateUrl: '/article-list/',
        activetab: 'article'
      }).
      when('/artikel/:artikel_name', {
        templateUrl: '/article-detail/',
        activetab: 'article',
        article_name: function (params) {return params.article_name}
      }).
      when('/lokasi-wisata', {
        templateUrl: '/travel-destination-list/',
        activetab: 'travel-destination'
      }).
      when('/lokasi-wisata/:travel_destination_name', {
        templateUrl: '/travel-destination-detail/',
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

