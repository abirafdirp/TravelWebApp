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
  }])
  .run(function(djangoAuth){
    djangoAuth.initialize('//127.0.0.1:8000/rest-auth', true);
  });

var kompresApp = angular.module('kompres', [
  'ngRoute',
  'kompresControllers',
  'kompresServices',
  'hateoas',
  'angularDjangoRegistrationAuthApp',
  'ngAnimate',
  'ngMaterial',
  'offClick',
  'ngMessages',
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
        templateUrl: '/partials/home/',
        activetab: 'home'
      }).
      when('/artikel', {
        templateUrl: '/partials/article-list/',
        activetab: 'article'
      }).
      when('/artikel/:artikel_name', {
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

kompresApp
.config(function($mdThemingProvider) {
  var customPrimary = {
        '50': '#f3909d',
        '100': '#f17988',
        '200': '#ee6274',
        '300': '#ec4b5f',
        '400': '#e9344b',
        '500': 'E71D36',
        '600': '#d4172e',
        '700': '#bd1429',
        '800': '#a61224',
        '900': '#8f0f1f',
        'A100': '#f6a7b1',
        'A200': '#f8bec6',
        'A400': '#fbd5da',
        'A700': '#780d1a',
        'contrastDefaultColor': 'light',
    };
    $mdThemingProvider
        .definePalette('customPrimary',
                        customPrimary);

    var customAccent = {
        '50': '#ffffff',
        '100': '#f7fbf9',
        '200': '#e6f3ea',
        '300': '#d5ebdc',
        '400': '#c3e3cd',
        '500': 'B2DBBF',
        '600': '#a1d3b1',
        '700': '#8fcba2',
        '800': '#7ec394',
        '900': '#6cba85',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#5bb277'
    };
    $mdThemingProvider
        .definePalette('customAccent',
                        customAccent);

    var customWarn = {
        '50': '#ffd59b',
        '100': '#ffca82',
        '200': '#ffbf68',
        '300': '#ffb54f',
        '400': '#ffaa35',
        '500': 'FF9F1C',
        '600': '#ff9402',
        '700': '#e88600',
        '800': '#ce7700',
        '900': '#b56800',
        'A100': '#ffe0b5',
        'A200': '#ffeace',
        'A400': '#fff5e8',
        'A700': '#9b5a00'
    };
    $mdThemingProvider
        .definePalette('customWarn',
                        customWarn);
      var customBackground = {
        '50': '#737373',
        '100': '#666666',
        '200': '#595959',
        '300': '#4d4d4d',
        '400': '#404040',
        '500': '#333',
        '600': '#262626',
        '700': '#1a1a1a',
        '800': '#0d0d0d',
        '900': '#000000',
        'A100': '#808080',
        'A200': '#8c8c8c',
        'A400': '#999999',
        'A700': '#000000'
    };
    $mdThemingProvider
        .definePalette('customBackground',
                        customBackground);

  $mdThemingProvider.theme('navbar-theme')
    .primaryPalette('customPrimary')
    .accentPalette('customAccent')
    .warnPalette('customWarn');
});