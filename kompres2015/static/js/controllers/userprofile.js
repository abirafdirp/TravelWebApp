'use strict';

angular.module('angularDjangoRegistrationAuthApp')
    .controller('UserprofileCtrl', ['$scope', 'djangoAuth', 'Validate', 'cachedResource', 'Districts', '$rootScope',
      function ($scope, djangoAuth, Validate, cachedResource, Districts, $rootScope) {
        $scope.model = {'first_name':'','last_name':'','email':'','district':''};
        $scope.complete = false;
        $scope.show_loading = false;
        $scope.district_names = [];
        $scope.districts = Districts.list.query(function(response){
          angular.forEach(response.results, function(district){
            $scope.district_names.push(district.name);
          });
        });
        $scope.district_search = '';

        $scope.searchSelectedChange = function(district){
          $scope.current_district = district;
        };

        $scope.searchTextChange = function(search){
          if (search) {
            search = search.toLowerCase();
          }
          else {
            $scope.current_district = '';
            return;
          }
          if ($rootScope.arrayContains($scope.district_names, search)){
            angular.forEach($scope.districts.results, function(item){
              if (item.name.toLowerCase() == search){
                $scope.current_district = item;
                $scope.orderByDistanceFromCtrl($scope.distance_toggle_wat);
              }
            });
          }
          else {
            $scope.current_district = '';
          }
        };

        djangoAuth.profile().then(function(data){
          $scope.model = data;
          if (data.district){
            $scope.model.district_name = cachedResource(data.district+'?format=json').get(function(){
              $scope.district_search = $scope.model.district_name.name;
            });
          }
        });
        $scope.updateProfile = function(formData, model){
          console.log($scope.current_district);
          if (($scope.current_district == '') || (typeof $scope.current_district === 'undefined')){
            $scope.model.district = '';
          }
          else {
            $scope.model.district = '/api/districts/' + $scope.current_district.id + '/';
          }
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
