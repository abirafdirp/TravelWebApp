'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('VerifyemailCtrl',['$scope', '$routeParams', 'djangoAuth',
    function ($scope, $routeParams, djangoAuth) {
      djangoAuth.verify($routeParams["emailVerificationToken"]).then(function(data){
        $scope.success = true;
      },function(data){
        $scope.failure = false;
      });
    }]);
