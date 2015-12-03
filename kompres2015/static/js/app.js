'use strict';

angular.module('angularDjangoRegistrationAuthApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
])
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $LocationProvider) {
        $routeProvider
            .when('/akun', {
              templateUrl: '/partials/account/',
              controller: 'MainCtrl',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/daftar', {
              templateUrl: '/partials/register/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/reset-password', {
              templateUrl: '/partials/passwordreset/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/konfirmasi-reset-password/:firstToken/:passwordResetToken/', {
              templateUrl: '/partials/passwordresetconfirm/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/masuk', {
              templateUrl: '/partials/login/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/konfirmasi-email/:emailVerificationToken', {
              templateUrl: '/partials/verifyemail/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/rest-auth/registration/account-confirm-email/:emailVerificationToken', {
              templateUrl: '/partials/verifyemail/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/keluar', {
              templateUrl: '/partials/logout/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/profil', {
              templateUrl: '/partials/userprofile/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/akun/ubah-password', {
              templateUrl: '/partials/changepassword/',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/tidak-diizinkan', {
              templateUrl: '/partials/restricted',
              controller: 'RestrictedCtrl',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus();
                }],
              }
            })
            .when('/harus-login/', {
              templateUrl: '/partials/authrequired/',
              controller: 'AuthrequiredCtrl',
              resolve: {
                authenticated: ['djangoAuth', function(djangoAuth){
                  return djangoAuth.authenticationStatus(true);
                }],
              }
            })
            .otherwise({
              redirectTo: '/'
            });
        $LocationProvider.html5Mode(true);
      }]);

var kompresApp = angular.module('kompres', [
  'ngRoute',
  'kompresControllers',
  'kompresServices',
  'ngResource',
  'angularDjangoRegistrationAuthApp',
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'ngMdIcons',
  'ngLocale',
  'ngSanitize',
  'uiGmapgoogle-maps',
  'angular-carousel',
  'ngFileUpload',
  'angularVideoBg',
  'angularUtils.directives.dirPagination',
  'satellizer',
]);

// differentiate angular and django template language
kompresApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
});

kompresApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
          templateUrl: '/partials/home/',
          activetab: 'home',
          controller: 'HomeCtrl'
        }).
        when('/artikel', {
          templateUrl: '/partials/article-list/',
          activetab: 'article'
        }).
        when('/artikel/:article_name', {
          templateUrl: '/partials/article-detail/',
          activetab: 'article',
          article_name: function (params) {return params.article_name}
        }).
        when('/lokasi-wisata', {
          templateUrl: '/partials/travel-destination-list/',
          activetab: 'travel-destination'
        }).
        when('/lokasi-wisata/:travel_destination_name', {
          templateUrl: '/partials/travel-destination-detail/',
          activetab: 'travel-destination',
          travel_destination_name: function (params) {return params.travel_destination_name}
        }).
        when('/komplain', {
          templateUrl: '/partials/report/',
          activetab: 'message-us'
        }).
        when('/peta', {
          templateUrl: '/partials/map/',
          activetab: 'map',
          controller: 'MapCtrl',
          resolve: {
            "travel_destinations": function(TravelDestinations, $resource, Marker){
              return TravelDestinations.list.query(function(response){
                angular.forEach(response.results, function(item){
                  item['thumbnail_image'] = $resource(item.thumbnail).get();
                  Marker.addMarker(item);
                });
              });
            }
          }
        }).
        otherwise({
          redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
  }
]);

kompresApp.config(function($authProvider) {
  $authProvider.facebook({
    url: "/api/login/social/token/facebook/",
    clientId: '295137440610143'
  });
});

kompresApp.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }]);

kompresApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('red')
      .warnPalette('pink');
});

kompresApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('article')
      .primaryPalette('blue-grey')
      .accentPalette('teal')
      .warnPalette('red');
});

kompresApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('destination')
      .primaryPalette('red')
      .accentPalette('blue')
      .warnPalette('red');
});

kompresApp.run(function($rootScope, ArticleSearch, TravelDestinationSearch, Marker) {
  $rootScope.slugify = function (name) {
    return name.replace(/ /g,'-').toLowerCase()
  };
  $rootScope.arrayContains = function(a, obj) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  };
  $rootScope.$on("$locationChangeStart", function(event, next) {
    ArticleSearch.clearAllSearch();
    TravelDestinationSearch.clearAllSearch();
    Marker.clearMarkers();
  });
  // calculate distance between two latitude and longitude points
  // based on http://stackoverflow.com/a/27943/3390639
  // using haversine formula
  $rootScope.distance = function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

  // using fisher yate shuffle http://bost.ocks.org/mike/shuffle/
  $rootScope.shuffle = function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
});

kompresApp.filter('trustAsHtml', function($sce) { return $sce.trustAsHtml; });

kompresApp.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyC72PSYYQFRLF_8cXUVu-Mu4xXFvwQoKZw',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});