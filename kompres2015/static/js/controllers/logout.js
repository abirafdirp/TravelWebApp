'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('LogoutCtrl',['$scope', '$location', 'djangoAuth',
    function ($scope, $location, djangoAuth) {
      djangoAuth.logout();
    }]);
