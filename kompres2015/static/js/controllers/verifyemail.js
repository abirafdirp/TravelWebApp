'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('VerifyemailCtrl',['$scope', '$routeParams', 'djangoAuth',
    function ($scope, $routeParams, djangoAuth) {
      $scope.show_loading = true;
      djangoAuth.verify($routeParams["emailVerificationToken"]).then(function(data){
        $scope.show_loading = false;
        $scope.success = true;
      },function(data){
        $scope.show_loading = false;
        $scope.failure = false;
      });
    }]);
