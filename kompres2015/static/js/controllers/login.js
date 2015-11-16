'use strict';

angular.module('angularDjangoRegistrationAuthApp')
  .controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.close = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	$location.path("/");
            $scope.close = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
