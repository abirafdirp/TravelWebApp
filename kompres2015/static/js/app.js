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
  })
  .animation('.slide-animation', function () {
    return {
      beforeAddClass: function (element, className, done) {
        var scope = element.scope();

        if (className == 'ng-hide') {
          var finishPoint = element.parent().width();
          if(scope.direction !== 'right') {
            finishPoint = -finishPoint;
          }
          TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
        }
        else {
          done();
        }
      },
      removeClass: function (element, className, done) {
        var scope = element.scope();

        if (className == 'ng-hide') {
          element.removeClass('ng-hide');

          var startPoint = element.parent().width();
          if(scope.direction === 'right') {
            startPoint = -startPoint;
          }

          TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
        }
        else {
          done();
        }
      }
    };
});

var kompresApp = angular.module('kompres', [
  'ngRoute',
  'kompresControllers',
  'kompresServices',
  'ngResource',
  'angularDjangoRegistrationAuthApp',
  'ngAnimate',
  'ngMaterial',
  'offClick',
  'ngMessages',
  'ngMdIcons',
  'ngLocale',
  'ngSanitize',
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
        activetab: 'home'
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

kompresApp.run(function($rootScope) {
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
});