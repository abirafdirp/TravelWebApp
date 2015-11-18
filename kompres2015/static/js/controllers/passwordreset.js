'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('PasswordresetCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'email':''};
  	$scope.complete = false;
    $scope.show_loading = false;
    $scope.resetPassword = function(formData){
      $scope.errors = [];
      $scope.show_loading = true;
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.resetPassword($scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
            $scope.show_loading = true;
        },function(data){
        	// error case
        	$scope.errors = data;
            $scope.show_loading = false;
        });
      }
      else {
        $scope.show_loading = false;
      }
    }
  });
