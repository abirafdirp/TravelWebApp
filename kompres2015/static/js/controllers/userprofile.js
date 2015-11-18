'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('UserprofileCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'first_name':'','last_name':'','email':''};
  	$scope.complete = false;
    $scope.show_loading = false;
  	djangoAuth.profile().then(function(data){
  		$scope.model = data;
  	});
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      $scope.show_loading = true;
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
        .then(function(data){
        	// success casec
            $scope.show_loading = true;
        	$scope.complete = true;
        },function(data){
        	// error case
            $scope.show_loading = false;
        	$scope.error = data;
        });
      }
      else {
        $scope.show_loading = false;
      }
    }
  });
