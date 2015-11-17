'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
    $scope.complete = false;
    $scope.show_loading = false;
    $scope.tab = 'login';
    $scope.setTab = function(name){
      $scope.tab = name;
    };


    $scope.login = function(formData){
      $scope.errors = [];
      $scope.show_loading = true;
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
          .then(function(data){
            // success case
            $scope.show_loading = false;
            $location.path("/");
          },function(data){
            // error case
            $scope.show_loading = false;
            $scope.errors = data;
          });
      }
    }
  });
