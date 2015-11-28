'use strict';

angular.module('angularDjangoRegistrationAuthApp')
    .controller('UserprofileCtrl', ['$scope', 'djangoAuth', 'Validate', '$resource', 'Districts', function ($scope, djangoAuth, Validate, $resource, Districts) {
      $scope.model = {'first_name':'','last_name':'','email':'','district':''};
      $scope.complete = false;
      $scope.show_loading = false;
      $scope.districts = Districts.query();
      $scope.district_search = '';
      $scope.hyperlinkedIt = function(district){
        $scope.model.district = '/api/districts/'+ district.id +'/';
      };
      djangoAuth.profile().then(function(data){
        $scope.model = data;
        $scope.model.district_name = $resource(data.district+'?format=json').get(function(){
          $scope.model.district_name = $scope.model.district_name.name;
          $scope.district_search = $scope.model.district_name;
        });
      });
      $scope.updateProfile = function(formData, model){
        $scope.errors = [];
        $scope.show_loading = true;
        Validate.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
          djangoAuth.updateProfile(model)
              .then(function(data){
                // success case
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
    }]);
