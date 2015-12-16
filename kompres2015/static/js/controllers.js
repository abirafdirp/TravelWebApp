var kompresControllers = angular.module('kompresControllers', []);

kompresControllers.controller('NavCtrl', ['$scope', '$route', '$mdDialog', 'ArticleSearch', 'TravelDestinationSearch', '$mdSidenav', 'djangoAuth', '$location',
  function($scope, $route, $mdDialog, ArticleSearch, TravelDestinationSearch, $mdSidenav, djangoAuth, $location) {
    $scope.$route = $route;
    $scope.logout_clicked = false;
    $scope.traveldestination_icon = 'terrain';
    $scope.article_icon = 'my_library_books';
    $scope.map_icon = 'directions';
    $scope.info_icon = 'info';
    $scope.transportation_icon = 'directions_bus';
    $scope.ArticleSearch = ArticleSearch;
    $scope.TravelDestinationSearch = TravelDestinationSearch;

    $scope.logout = function() {
      djangoAuth.logout();
    };

    // confirm dialog bugged on 1.0.0 RC4, https://github.com/angular/material/issues/5947
    // too afraid too update, use custom dialog instead
    $scope.showConfirmLogout = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: logout_template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      });
      function DialogController($scope, $mdDialog, djangoAuth, $auth) {
        $scope.closeDialog = function() {
          $auth.logout();
          $mdDialog.hide();
        };
        $scope.logout = function(){
          djangoAuth.logout().then(function(){
            $scope.authenticated = false;
            $scope.closeDialog();
          });
        };
      }
    };

    $scope.toggleMenu = function(url) {
      if (url){
        $location.path(url);
      }
      $mdSidenav('left').toggle();
    };

    $scope.reset_logout_clicked = function() {
      $scope.logout_clicked = false;
    };
    $scope.showLogin = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: login_template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      });
      function DialogController($scope, $mdDialog, $timeout) {
        $scope.authenticated = false;
        $scope.closeDialogDelayed = function() {
          $timeout(function(){
            $mdDialog.hide();}, 350);
        };
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.$on('djangoAuth.logged_in', function() {
          $scope.authenticated = true;
        });
        $scope.$on('djangoAuth.logged_out', function() {
          $scope.authenticated = false;
        });
      }
    };
    $scope.showRegister = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: register_template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      });
      function DialogController($scope, $mdDialog, $timeout) {
        $scope.closeDialogDelayed = function() {
          $timeout(function(){
            $mdDialog.hide();}, 350);
        };
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.$on('djangoAuth.logged_in', function() {
          $scope.authenticated = true;
        });
        $scope.$on('djangoAuth.logged_out', function() {
          $scope.authenticated = false;
        });
      }
    };
    $scope.showProfile = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: userprofile_template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      });
      function DialogController($scope, $mdDialog, $timeout) {
        $scope.closeDialogDelayed = function() {
          $timeout(function(){
            $mdDialog.hide();}, 350);
        };
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.authenticated = true;
        $scope.$on('djangoAuth.logged_in', function() {
          $scope.authenticated = true;
        });
        $scope.$on('djangoAuth.logged_out', function() {
          $scope.authenticated = false;
        });
      }
    };

    $scope.showImage = function(image) {
      $mdDialog.show({
        locals: {image:image},
        template:
        '<md-dialog aria-label="galeri" class="resize-container">' +
        '     <img ng-src="{$ image $}" class="resize">' +
        '</md-dialog>',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        controller: function DialogController($scope, $mdDialog, image) {
          $scope.image = image;
          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
        }
      });
    };
  }
]);

kompresControllers.controller('LoginNavCtrl', ['$scope',
  function($scope) {
    $scope.tab = 'Masuk';
    $scope.setTab = function(name){
      $scope.tab = name;
    };
  }
]);

kompresControllers.controller('RegionsCtrl', ['$scope', 'Regions',
  function($scope, Regions) {
    $scope.regions = Regions.query();
  }
]);

kompresControllers.controller('ProvincesCtrl', ['$scope', 'Provinces',
  function($scope, Provinces) {
    $scope.provinces = Provinces.query();
  }
]);

kompresControllers.controller('DistrictsCtrl', ['$scope', 'Districts',
  function($scope, Districts) {
    $scope.provinces = Districts.query();
  }
]);

kompresControllers.controller('TransportationListCtrl', ['$scope', 'Transportations', '$routeParams', 'cachedResource',
  function($scope, Transportations, $routeParams, cachedResource) {
    $scope.params = $routeParams;
    $scope.transportation_search = '';
    $scope.search = $scope.params.search;
    $scope.transportations = Transportations.list.query(function(response){
      angular.forEach(response.results, function(transportation){
        transportation['districts_resolved'] = [];
        angular.forEach(transportation.districts, function(district){
          cachedResource(district).get(function(response){
            transportation.districts_resolved.push(response);
          });
        });
        // should have used $q
        $scope.show_loading = false;
      });
    });
  }
]);

kompresControllers.controller('TransportationRepeatCtrl', ['$scope', 'cachedResource', '$exceptionHandler',
  function($scope, cachedResource, $exceptionHandler) {
    var init = function() {
      if (typeof $scope.transportation === "undefined") {
        $exceptionHandler("The TransportationRepeatController must be initialized with a transportation in scope");
      }
      $scope.districts_resolved = [];
    };

    init();
  }
]);


kompresControllers.controller('TravelDestinationListCtrl', ['$scope', '$route', '$routeParams', 'cachedResource', '$rootScope', 'TravelDestinations', 'Districts',
  'Provinces', 'Regions', 'Marker', 'djangoAuth', '$filter', 'Visits', '$resource',
  function($scope, $route, $routeParams, cachedResource, $rootScope, TravelDestinations, Districts, Provinces, Regions, Marker, djangoAuth, $filter, Visits, $resource) {
    $scope.show_loading = true;
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.travel_destination_name = $scope.params.travel_destination_name;
    $scope.search = $scope.params.search;
    $scope.categories = [];
    $scope.district_names = [];
    $scope.districts = Districts.list.query(function(data){
      angular.forEach(data.results, function(item){
        $scope.district_names.push(item.name.toLowerCase());
      });
    });
    $scope.provinces = Provinces.query();
    $scope.regions = Regions.query();
    $scope.current_location = '';

    $scope.category_icon = 'keyboard_arrow_right';
    $scope.all_category_icon = 'keyboard_arrow_right';

    $scope.$on('djangoAuth.logged_in', function(){
      init();
    });

    $scope.$on('djangoAuth.logged_out', function(){
      $scope.district_search = '';
      init();
    });


    // toggle value is passed after the model change, that's why it's negated
    $scope.visited_toggle = false;
    $scope.hide_visited = false;
    $scope.visitToggle = function(cond){
      if (cond == false){
        $scope.hide_visited = true;
      }
      else{
        $scope.hide_visited = false;
      }
    };

    $scope.current_district = '';
    $scope.district_search = '';

    $scope.searchSelectedChange = function(district){
      $scope.current_district = district;
      $scope.orderByDistanceFromCtrl($scope.distance_toggle_wat);
    };

    $scope.searchTextChange = function(search){
      if (search) {
        search = search.toLowerCase();
      }
      else {
        $scope.current_district = '';
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

    $scope.show_sidenav = false;
    $scope.distance_toggle_auth = false;

    // SPHAGETTIIIII
    //
    // checkbox model must be replicated with the ng-click function (distance_toggle_wat)
    // the booleans checking are also guessed....
    //
    // TODO investigate checkbox behaviour and clean this mess up
    // checkbox scope seems isolated, but must be declared in controller
    $scope.distance_toggle = false;
    // distance toggle value is passed before the model change, that's why it's negated
    // and also the checkboxes scopes seems isolated ????
    $scope.orderByDistance = function(distance_toggle) {
      $scope.distance_toggle_wat = distance_toggle;
      if (distance_toggle == false){
        if (($scope.current_district != '') || (!$scope.authenticated)){
          angular.forEach($scope.travel_destinations.results, function(item){
            item['distance'] = $rootScope.distance($scope.current_district.latitude, $scope.current_district.longitude, item.district_resolved.latitude, item.district_resolved.longitude);
          });
        }
        $scope.travel_destinations.results = $filter('orderBy')($scope.travel_destinations.results, 'distance');
      }
      else {
        $scope.orderByRandom();
      }
    };

    $scope.orderByDistanceFromCtrl = function(distance_toggle) {
      if (distance_toggle == false){
        if (($scope.current_district != '') || (!$scope.authenticated)){
          angular.forEach($scope.travel_destinations.results, function(item){
            item['distance'] = $rootScope.distance($scope.current_district.latitude, $scope.current_district.longitude, item.district_resolved.latitude, item.district_resolved.longitude);
          });
        }
        $scope.travel_destinations.results = $filter('orderBy')($scope.travel_destinations.results, 'distance');
      }
      else {
        $scope.orderByRandom();
      }
    };

    $scope.orderByRandom = function() {
      $rootScope.shuffle($scope.travel_destinations.results);
    };

    var init = function() {
      $scope.visit = Visits.query(function(data){
        $scope.visits = [];
        angular.forEach(data.results, function(data){
          cachedResource(data.travel_destination).get(function(dest){
            $scope.visits.push(dest.id);
          });
        });
      });

      $scope.deffered_distances = 0;

      $scope.visit.$promise.finally(function(){
        $scope.travel_destinations = TravelDestinations.list.query();

        $scope.travel_destinations.$promise.then(function(){
          $scope.orderByRandom();
          $scope.user = djangoAuth.profile().then(function(data){
                $scope.user = data;
                $resource($scope.user.district+'?format=json').get(function(data){
                  $scope.user.district = data;
                  $scope.district_search = $scope.user.district.name;
                  angular.forEach($scope.travel_destinations.results, function(item){
                    if ($rootScope.arrayContains($scope.categories, item.type) == false){
                      $scope.categories.push(String(item.type));
                    }
                    if ($rootScope.arrayContains($scope.visits, item.id) == true){
                      item['visited'] = true;
                    }
                    item['distance'] = $rootScope.distance($scope.user.district.latitude, $scope.user.district.longitude, item.latitude, item.longitude);

                    // this is bad, should have use $q
                    $scope.deffered_distances += 1;
                    if ($scope.deffered_distances.length == $scope.travel_destinations.results.length){
                      $scope.deffered_distances = 0;
                      $scope.show_sidenav = true;
                      // instant orderby
                      //$scope.distance_toggle_auth = true;
                    }
                    item['district_resolved'] = cachedResource(item.district).get(function(){
                      item['province'] = cachedResource(item.district_resolved.province).get(function(){
                        item['region'] = cachedResource(item.province.region).get();
                      });
                    });
                  });
                });
              },angular.forEach($scope.travel_destinations.results, function(item){
                $scope.show_sidenav = true;
                $scope.sidenav_disabled = true;
                if ($rootScope.arrayContains($scope.categories, item.type) == false){
                  $scope.categories.push(String(item.type));
                }
                item['district_resolved'] = cachedResource(item.district).get(function(){
                  item['province'] = cachedResource(item.district_resolved.province).get(function(){
                    item['region'] = cachedResource(item.province.region).get();
                  });
                });
              })
          );
          $scope.show_loading = false;
        });
      });
    };

    init();

    $scope.$on('djangoAuth.profile_updated', function() {
      djangoAuth.profile().then(function(data){
        $scope.user = data;
        $resource($scope.user.district+'?format=json').get(function(data) {
          $scope.user.district = data;
          $scope.district_search = data.name;
          angular.forEach($scope.travel_destinations.results, function(item){
            item['district_resolved'] = cachedResource(item.district).get(function(){
              item['distance'] = $rootScope.distance($scope.user.district.latitude, $scope.user.district.longitude, item.district_resolved.latitude, item.district_resolved.longitude);
            });
          });
        });
      });
    });

  }
]);

kompresControllers.controller('TravelDestinationDetailCtrl', ['$scope', '$route', '$routeParams', 'TravelDestinations', 'cachedResource', '$interval', '$mdDialog',
  'TravelDestinationSearch', '$location', 'Transportations', '$rootScope',
  function($scope, $route, $routeParams, TravelDestinations, cachedResource, $interval, $mdDialog, TravelDestinationSearch, $location, Transportations, $rootScope) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.travel_destination_name = $scope.params.travel_destination_name.replace(/-/g,' ');
    $scope.TravelDestinationSearch = TravelDestinationSearch;
    $scope.show_loading = true;

    $scope.current_url = $location.absUrl();
    $scope.gallery_images = [];

    $scope.travel_destination = TravelDestinations.detail.query({travel_destination_name:$scope.travel_destination_name});
    $scope.travel_destination.$promise.then(function() {
      cachedResource($scope.travel_destination.results[0].thumbnail+'?format=json').get(function(data){
        $scope.gallery_images.push(data);
      });
      $rootScope.title = $scope.travel_destination.results[0].name + ' - Discover Indonesia';
      var url = $scope.travel_destination.results[0].district+'?format=json';
      $scope.district = cachedResource(url).get(function(){
        $scope.transportations = Transportations.in_district.query({district:$scope.district.name});
        $scope.province = cachedResource($scope.district.province).get(function(){
          $scope.region = cachedResource($scope.province.region).get(function(){
            //showloading
          });
        });
      });

      $scope.images_length = $scope.travel_destination.results[0].images.length;
      $scope.main_images = [];
      angular.forEach($scope.travel_destination.results[0].images, function (image, index){
        cachedResource(image+'?format=json').get(function(image){
          if (image.type == 'main'){
            $scope.main_images.push(image);
            $scope.gallery_images.push(image);
          }
          else {
            $scope.gallery_images.push(image);
          }
        });
      });

      $scope.travel_destination_contents = [];
      if ($scope.travel_destination.results[0].contents.length > 0){
        angular.forEach($scope.travel_destination.results[0].contents, function(content, index){
          $scope.travel_destination_contents.push(cachedResource(content+'?format=json').get());
          if (index == $scope.travel_destination.results.length - 1){
            $scope.show_loading = false;
          }
        });
      }
      else {
        $scope.show_loading = false;
      }


      $scope.showVisit = function(travel_destination) {
        $mdDialog.show({
          locals: {travel_destination_local: travel_destination},
          controller: DialogController,
          template: visit_template,
          parent: angular.element(document.body),
          clickOutsideToClose:false,
        });
        function DialogController($scope, $mdDialog, Visits, $filter, travel_destination_local) {
          $scope.complete = false;
          $scope.show_loading = false;
          $scope.travel_destination = travel_destination_local;
          $scope.closeDialog = function() {
            $mdDialog.hide();
          };

          $scope.errors = [];
          $scope.date = new Date();
          $scope.max_date = new Date(
              $scope.date.getFullYear(),
              $scope.date.getMonth(),
              $scope.date.getDate());
          $scope.newVisit = new Visits();
          $scope.newVisit.travel_destination = '/api/traveldestinations/' + travel_destination_local.id +'/';
          $scope.save = function() {
            $scope.newVisit.date = $filter('date')($scope.date, 'yyyy-MM-dd');
            $scope.newVisit.message = $scope.message;
            $scope.show_loading = true;
            $scope.newVisit.$save().then(function() {
                  $scope.complete = true;
                  $scope.show_loading = false;
                },
                function(data){
                  $scope.errors = data.data;
                  $scope.show_loading = false;
                })
          };
        }
      };
    });
  }
]);

kompresControllers.controller('TravelDestinationRepeatCtrl', ['$scope', 'cachedResource', '$exceptionHandler', 'djangoAuth', '$rootScope',
  function($scope, cachedResource, $exceptionHandler, djangoAuth, $rootScope) {
    var init = function() {
      if (typeof $scope.travel_destination === "undefined") {
        $exceptionHandler("The TravelDestinationRepeatController must be initialized with a travel_destination in scope");
      }
      $scope.TravelDestinationInRepeat = $scope.travel_destination;
      if($scope.travel_destination.short_description.length > 180){
        $scope.travel_destination_short_description = $scope.travel_destination.short_description.substring(0,180) + ' ...';
      }
      else{
        $scope.travel_destination_short_description = $scope.travel_destination.short_description;
      }
      $scope.district = cachedResource($scope.travel_destination.district).get();
      $scope.thumbnail = cachedResource($scope.travel_destination.thumbnail).get();
    };

    init();
  }
]);

kompresControllers.controller('ArticleListCtrl', ['$scope', '$route', '$routeParams', 'cachedResource', '$timeout', '$filter', 'Articles', 'PostCategory',
  function($scope, $route, $routeParams, cachedResource, $timeout, $filter, Articles, PostCategory) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.show_loading = true;
    $scope.categories = PostCategory.getCategories();
    $scope.categories_colors = PostCategory.getColors();
    $scope.search = $scope.params.search;
    $scope.color = 'md-warn';

    $scope.category_icon = 'keyboard_arrow_right';
    $scope.all_category_icon = 'keyboard_arrow_right';

    $scope.articles = Articles.list.query();
    $scope.articles.$promise.then(function() {
      $scope.articles.results = $filter('orderBy')($scope.articles.results,'date', true);
      angular.forEach($scope.articles.results, function(item){
        item.date = $filter('date')(item.date, 'd  MMMM  yyyy');
        PostCategory.addCategory(item.category);
      });
      $scope.show_loading = false;
    });
  }
]);

kompresControllers.controller('ArticleDetailCtrl', ['$scope', '$route', '$routeParams', 'cachedResource', 'Articles', '$rootScope',
  function($scope, $route, $routeParams, cachedResource, Articles, $rootScope) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.show_loading = true;
    $scope.article_name = $scope.params.article_name.replace(/-/g,' ');

    $scope.article = Articles.detail.query({article_name:$scope.article_name});
    $scope.article.$promise.then(function() {
      $rootScope.title = $scope.article.results[0].title + ' - Discover Indonesia';
      $scope.main_image = cachedResource($scope.article.results[0].main_image+'?format=json').get(function() {
        $scope.show_loading = false;
      });
    });
  }
]);

kompresControllers.controller('ArticleRepeatCtrl', ['$scope', 'cachedResource', '$exceptionHandler', 'PostCategory',
  function($scope, cachedResource, $exceptionHandler,  PostCategory) {
    var init = function() {
      if (typeof $scope.article === "undefined") {
        $exceptionHandler("The ArticleRepeatController must be initialized with a article in scope");
      }
      $scope.articleInRepeat = $scope.article;
      $scope.show_loading = true;
      if($scope.article.short_description.length > 500){
        $scope.article_short_description = $scope.article.short_description.substring(0,500) + ' ...';
      }
      else{
        $scope.article_short_description = $scope.article.short_description;
      }
      $scope.thumbnail = cachedResource($scope.article.thumbnail).get(function() {
        $scope.show_loading = false;
      });
    };
    init();
  }
]);

kompresControllers.controller('ReportCtrl', ['$scope', '$mdDialog',
  function($scope, $mdDialog) {
    $scope.showReport = function(travel_destination) {
      $mdDialog.show({
        locals: {travel_destination_local: travel_destination},
        controller: DialogController,
        template: report_template,
        parent: angular.element(document.body),
        clickOutsideToClose:false,
      });
      function DialogController($scope, $mdDialog, Districts, Reports, TravelDestinations, $rootScope, Upload, travel_destination_local) {
        $scope.uploadCount = 0;
        $scope.travel_destination_local = travel_destination_local;
        $scope.upload = function (file, report) {
          Upload.upload({
            url: '/api/user/reportimages/',
            data: {'image': file, 'name': file.name, 'tag': 'report', 'report': report}
          }).then(function (resp) {
            $scope.uploadCount = $scope.uploadCount + 1;
            if ($scope.uploadCount == $scope.files.length){
              $scope.uploadCount = 0;
              $scope.complete = true;
              $scope.show_loading = false;
            }
            //console.log('Success ' + resp.config.data.image.name + 'uploaded. Response: ' + resp.data);
          }, function (resp) {
            //console.log('Error status: ' + resp.status);
          }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image.name);
          });
        };
        $scope.uploadFiles = function (files, report) {
          if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              $scope.upload(files[i], report);
            }
          }
        };
        $scope.uploadImages = function() {
          $scope.uploadFiles($scope.files, $scope.report);
        };


        $scope.authenticated = false;
        $scope.districts = Districts.list.query();
        $scope.travel_destination_names = [];
        $scope.complete = false;
        $scope.show_loading = false;
        $scope.travel_destinations = TravelDestinations.list.query(function(){
          angular.forEach($scope.travel_destinations.results, function(item){
            $scope.travel_destination_names.push(item.name.toLowerCase());
          })
        });
        $scope.travel_destination_search = '';
        $scope.categories = ['keamanan', 'kebersihan', 'kenyamanan', 'lainnya'];
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.searchSelectedChange = function(destination){
          $scope.newReport.travel_destination = '/api/traveldestinations/' + destination.id + '/';
        };
        $scope.searchTextChange = function(destination_name){
          if (destination_name){
            destination_name = destination_name.toLowerCase();
          }
          if($rootScope.arrayContains($scope.travel_destination_names, destination_name)){
            angular.forEach($scope.travel_destinations.results, function(item){
              if (item.name.toLowerCase() == destination_name){
                $scope.newReport.travel_destination = '/api/traveldestinations/' + item.id + '/';
              }
            });
          }
          else{
            $scope.newReport.travel_destination = '';
          }
        };
        $scope.errors = [];
        $scope.newReport = new Reports();
        $scope.newReport.travel_destination = '/api/traveldestinations/' + travel_destination_local.id +'/';
        $scope.save = function() {
          $scope.show_loading = true;
          $scope.newReport.$save().then(function(result) {
                $scope.report = '/api/user/reports/' + result.resource.id + '/';
                if ($scope.files){
                  $scope.uploadImages();
                }
                $scope.complete = true;
                $scope.show_loading = false;
              },
              function(data){
                $scope.errors = data.data;
                $scope.show_loading = false;
              })
        };
      }
    };
  }
]);

kompresControllers.controller('ReportListCtrl', ['$scope', 'Reports', 'djangoAuth', 'cachedResource', '$filter', '$resource',
  function($scope, Reports, djangoAuth, cachedResource, $filter, $resource) {
    $scope.user = djangoAuth.profile().then(function(data){
      $scope.user = data;
      $scope.reports_resolved = [];
      angular.forEach($scope.user.reports, function(report){
        $resource(report + '?format=json').get(function(data){
          $scope.reports_resolved.push(data);
          if ($scope.reports_resolved.length == $scope.user.reports.length){
            $scope.reports_resolved = $filter('orderBy')($scope.reports_resolved, '-created_date');
          }
        });
      });
    });
  }
]);

kompresControllers.controller('ReportListRepeatCtrl', ['$scope', 'cachedResource', '$exceptionHandler',
  function($scope, cachedResource, $exceptionHandler) {
    var init = function() {
      if (typeof $scope.report === "undefined") {
        $exceptionHandler("The ReportListRepeatController must be initialized with a report in scope");
      }
      $scope.travel_destination = cachedResource($scope.report.travel_destination).get();
      if ($scope.report.images.length > 0){
        $scope.image = cachedResource($scope.report.images[0]).get();
      }
    };

    init();
  }
]);

kompresControllers.controller('VisitsCtrl', ['$scope', 'Visits', 'cachedResource', '$rootScope',
  function($scope, Visits, $resource, $rootScope) {
    var init = function(){
      $scope.disabled = false;
      Visits.query(function(data){
            angular.forEach(data.results, function(visit){
              $resource(visit.travel_destination).get(function(dest){
                if (dest.id == $scope.$parent.travel_destination.id){
                  $scope.visited = true;
                }
              });
            });
          }, function(){
            $scope.disabled = true
          }
      );
    };
    init();
    $rootScope.$on('djangoAuth.logged_in', function(){
      init();
    });
    $rootScope.$on('djangoAuth.logged_out', function(){
      init();
    });
  }
]);

kompresControllers.controller('HomeCtrl', ['$scope', 'Visits', 'TravelDestinations', 'Articles', 'Page', 'cachedResource', 'ColorRandomizer',
  function($scope, Visits, TravelDestinations, Articles, Page, cachedResource, ColorRandomizer) {
    $scope.homelink_counter = 0;
    $scope.resolved = false;
    $scope.icon = 'keyboard_arrow_right';

    Page.query(function(data){
      $scope.page = data.results[0];
      $scope.page.home_links = [];

      angular.forEach($scope.page.homelinks, function(home_link){
        cachedResource(home_link).get(function(data){
          data.color = ColorRandomizer.getColor();
          data.color2 = ColorRandomizer.getColor();
          $scope.page.home_links.push(data);
          $scope.homelink_counter += 1;
          if ($scope.homelink_counter == $scope.page.homelinks.length){
            $scope.homelinks_resolved = true;
            $scope.resolved = true;
          }
        });
      });
    });
  }
]);

kompresControllers.controller('ReportsCtrl', ['$scope', 'Reports',
  function($scope, Reports) {
    $scope.reports = Reports.query();
  }
]);

kompresControllers.controller('FacebookTokenCtrl', ['$scope', '$auth', 'djangoAuth', '$rootScope',
  function($scope, $auth, djangoAuth, $rootScope) {
    $scope.authenticate = function(){
      $auth.authenticate('facebook').then(function(response){
        djangoAuth.authenticated = true;
        $rootScope.$broadcast("djangoAuth.logged_in", response);
      });
    };
    $scope.logout = function () {
      $auth.removeToken();
      djangoAuth.authenticated = true;
      $rootScope.$broadcast("djangoAuth.logged_out");
    };
  }
]);

kompresControllers.controller('ReportImagesCtrl', ['$scope', 'ReportImages',
  function($scope, ReportImages) {
    $scope.report_images = ReportImages.query();
  }
]);

kompresApp.controller('ModelViewerCtrl', ['$scope', 'TravelDestinations', '$routeParams', '$rootScope',
  function ($scope, TravelDestinations, $routeParams, $rootScope) {
    $scope.params = $routeParams;
    $rootScope.title = '3D - ' + $scope.params.travel_destination_name;
    $scope.travel_destination_name = $scope.params.travel_destination_name.replace(/-/g,'%20');
    $scope.assimpModelUrl = 'partials/models/' + $scope.travel_destination_name + '/';
  }]);

kompresControllers.controller('ImagesCtrl', ['$scope', 'Images',
  function($scope, Images) {
    $scope.images = Images.query();
  }
]);

kompresControllers.controller('ArticleMainImages', ['$scope', 'ArticleMainImages',
  function($scope, ArticleMainImages) {
    $scope.article_main_images = ArticleMainImages.query();
  }
]);

kompresControllers.controller('TravelDestinationImagesCtrl', ['$scope', 'TravelDestinationImages',
  function($scope, TravelDestinationImages) {
    $scope.travel_destination_images = TravelDestinationImages.query();
  }
]);

kompresControllers.controller('PageCtrl', ['$scope', 'Page',
  function($scope, Page) {
    $scope.page = Page.query();
  }
]);

kompresControllers.controller('SearchCtrl', ['$scope', 'ArticleSearch', '$timeout', 'TravelDestinationSearch', '$routeParams',
  function($scope, ArticleSearch, $timeout, TravelDestinationSearch, $routeParams) {
    $scope.ArticleSearch = ArticleSearch;
    $scope.TravelDestinationSearch = TravelDestinationSearch;
    $scope.search_opened = false;
    $scope.search_icon = 'search';
    $scope.allow_dest_clear = false;

    $scope.clearAllDestSearch = function(){
      $scope.TravelDestinationSearch.clearAllSearch();
    };
    $scope.allowDestClear = function(){
      // uhhhh what
      if ((TravelDestinationSearch.district_search != '') || (TravelDestinationSearch.province_search !='') || (TravelDestinationSearch.region_search != '') || (TravelDestinationSearch.category_search != '')){
        return false;
      }
      return true;
    };

    $scope.params = $routeParams;

    if ($scope.params.destinasi_kategori){
      TravelDestinationSearch.setCategorySearch($scope.params.destinasi_kategori);
    }

    if ($scope.params.destinasi_kabupaten){
      TravelDestinationSearch.setDistrictSearch($scope.params.destinasi_kabupaten);
    }

    if ($scope.params.destinasi_provinsi){
      TravelDestinationSearch.setProvinceSearch($scope.params.destinasi_provinsi);
    }

    if ($scope.params.destinasi_wilayah){
      TravelDestinationSearch.setRegionSearch($scope.params.destinasi_wilayah);
    }

    if ($scope.params.artikel_kategori){
      ArticleSearch.setCategorySearch($scope.params.artikel_kategori);
    }


    $scope.toggleSearch = function (){
      $scope.search_opened = !$scope.search_opened;
      if ($scope.search_opened){
        $scope.search_icon = 'close';
      }
      else {
        $scope.search_icon = 'search';
      }
    };
  }
]);

kompresControllers.controller('MapCtrl', ['$scope', 'TravelDestinations', '$routeParams', 'cachedResource', '$route',
  'travel_destinations', 'Marker', 'uiGmapGoogleMapApi', '$rootScope',
  function($scope, TravelDestinations, $routeParams, cachedResource, $route, travel_destinations, Marker, uiGmapGoogleMapApi, $rootScope) {
    $scope.map = {
      "center": {
        "latitude": -4.6111678,
        "longitude": 118.6796369
      },
      "zoom": 5
    };

    $scope.show_loading = true;
    uiGmapGoogleMapApi.then(function() {
      $scope.show_loading = false;
      $scope.travel_destination_names = [];
      angular.forEach($scope.travel_destinations.results, function (item) {
        $scope.travel_destination_names.push(item.name.toLowerCase());
      });
    });

    $scope.search = '';

    $scope.params = $routeParams;
    $scope.ltd = $scope.params.ltd;
    $scope.lng = $scope.params.lng;
    if (($scope.ltd) && ($scope.lng)){
      $scope.map.center.latitude = $scope.ltd;
      $scope.map.center.longitude = $scope.lng;
      $scope.map.zoom = 14;
    }

    $scope.searchSelectedChange = function(destination){
      $scope.map.center.latitude = destination.latitude;
      $scope.map.center.longitude = destination.longitude;
      $scope.map.zoom = 14;
    };

    $scope.searchTextChange = function(search){
      if (search) {
        search = search.toLowerCase();
      }
      if ($rootScope.arrayContains($scope.travel_destination_names, search)){
        angular.forEach($scope.travel_destinations.results, function(item){
          if (item.name.toLowerCase() == search){
            $scope.map.center.latitude = item.latitude;
            $scope.map.center.longitude = item.longitude;
            $scope.map.zoom = 14;
          }
        });
      }
    };

    $scope.markers = Marker.getMarkers();
    $scope.travel_destinations = travel_destinations;

  }
]);

// todo find a better way to save template
var login_template = `
<md-dialog aria-label="masuk" ng-controller="LoginNavCtrl">
	<md-toolbar>
		<div class="md-toolbar-tools">
			<h2>{$ tab $}</h2>
			<span flex></span>
			<md-button class="md-icon-button" ng-click="closeDialog()">
				<ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
			</md-button>
		</div>
	</md-toolbar>
	<md-dialog-content class="md-dialog-content-login">
		<form role="form" ng-submit="login(loginForm)" ng-cloak ng-controller="LoginCtrl" name="loginForm" novalidate class="login" layout="column" layout-align="center center" ng-show="tab == 'Masuk'">

			<div class="md-dialog-content" layout="column" layout-align="center center">

				<md-input-container class="md-block">
					<label for="id_username">Username</label>
					<input auto-focus name="username" id="id_username" type="text" ng-model="model.username" placeholder="Username" class="form-control" required />
					<div ng-messages="loginForm.username.$error">
						<div ng-message="required" ng-repeat="error in errors.username">{$error$}</div>
					</div>
				</md-input-container>
				<md-input-container class="md-block">
					<label for="id_password">Password</label>
					<input name="password" id="id_password" type="password" ng-model="model.password" placeholder="Password" class="form-control" required />
					<div ng-messages="loginForm.password.$error">
						<div ng-message="required" ng-repeat="error in errors.password">{$error$}</div>
					</div>
				</md-input-container>
				<div ng-show="errors" class="animated fadeIn">
					<p class="md-body-1" ng-repeat="error in errors.non_field_errors">{$error$}</p>
					<p class="md-body-1" ng-if="error">{$error$}</p>
				</div>
				<span ng-show="show_loading && !errors.length > 0">
					<md-progress-circular md-mode="indeterminate"></md-progress-circular>
				</span>
				<md-button ng-show="show_loading == false || errors" type="submit" class="md-raised md-primary">masuk</md-button>

				<div ng-controller="FacebookTokenCtrl">
					<md-button class="md-raised md-warn" ng-click="authenticate('facebook')">
						<ng-md-icon icon="facebook" size="22" aria-label="user"></ng-md-icon>Masuk Dengan Facebook
					</md-button>
				</div>

				<md-button class="md-raised md-accent" ng-click="setTab('Lupa Password')">lupa password</md-button>
			</div>
			<div ng-if="authenticated">{$ closeDialogDelayed() $}</div>
		</form>

		<form role="form" name="passwordResetForm" ng-submit="resetPassword(passwordResetForm)" novalidate ng-show="tab == 'Lupa Password'" ng-controller="PasswordresetCtrl">

			<div class="md-dialog-content" layout="column" layout-align="center center">

				<md-input-container class="md-block">
					<label for="id_email">Email</label>
					<input auto-focus name="email" id="id_email" class="form-control" type="text" ng-model="model.email" placeholder="Email" required/>
					<div ng-messages="passwordResetForm.email.$error">
						<div ng-message="required" ng-repeat="error in errors.email">{$error$}</div>
						<div ng-message="email" ng-repeat="error in errors.email">{$error$}</div>
					</div>
				</md-input-container>

				<div ng-show="errors" class="animated fadeIn">
					<p class="md-body-1" ng-repeat="error in errors.non_field_errors">{$error$}</p>
					<p class="md-body-1" ng-repeat="error in errors.__all__">{$error$}</p>
					<p ng-show="errors.email != 'This field is required.'" class="md-body-1" ng-repeat="error in errors.email">{$error$}</p>
				</div>
				<span ng-show="show_loading && errors.length == 0 && !complete">
					<md-progress-circular md-mode="indeterminate" style="margin: 0;"></md-progress-circular>
				</span>
				<div ng-if="complete == true">
					<p class="md-body-1">Cek email anda untuk instruksi reset password anda!</p>
				</div>
				<md-button ng-show="show_loading == false" type="submit" class="md-raised md-primary">reset password</md-button>
				<md-button class="md-raised md-accent" ng-click="setTab('Masuk')">login</md-button>

			</div>
		</form>
	</md-dialog-content>

</md-dialog>`;

var report_template = `
<md-dialog aria-label="komplain">
	<md-toolbar>
		<div class="md-toolbar-tools">
			<h2>komplain</h2>
			<span flex></span>
			<md-button class="md-icon-button" ng-click="closeDialog()">
				<ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
			</md-button>
		</div>
	</md-toolbar>
	<md-dialog-content id="report_view">
		<div class="md-dialog-content" layout="column" layout-align="center center">
			<form role="form" name="reportForm" ng-submit="save()" novalidate>
				<div layout="row" style="min-width: 400px" layout-align="left center">
					<md-autocomplete
								md-search-text="travel_destination_search"
								md-items="travel_destination in travel_destinations.results | filter: travel_destination_search | orderBy: 'name'"
								md-item-text="travel_destination.name"
								md-min-length="0"
								md-floating-label="Lokasi Wisata"
								md-selected-item-change="searchSelectedChange(travel_destination)"
								md-selected-item ="travel_destination_local"
								md-search-text-change="searchTextChange(travel_destination_search)"
								placeholder="Lokasi Wisata"
								class="animated fadeIn"
								name="travel_destination"
								md-input-name="travel_destination"
								id="id_travel_destination"
								class="form-control"
								type="text"
								required
								flex="60">
					<md-item-template>
						<span class="animated fadeIn" md-highlight-text="travel_destination_search" md-highlight-flags="^i">{$travel_destination.name$}</span>
					</md-item-template>
					<md-not-found>
					</md-not-found>
					<div ng-messages="reportForm.travel_destination.$error">
						<div ng-message="required" ng-repeat="error in errors.travel_destination">{$error$}</div>
					</div>
				</md-autocomplete>
					<md-input-container flex class="report-category">
					<label for="id_category">Kategori</label>
					<md-select ng-model="newReport.category" name="category" id="id_category" class="form-control" required>
						<md-option ng-repeat="category in categories" value="{$category$}">
							{$category$}
						</md-option>
					</md-select>
					<div ng-messages="reportForm.category.$error">
						<div ng-message="required" ng-repeat="error in errors.category">{$error$}</div>
					</div>
				</md-input-container>
				</div>



				<md-input-container class="md-block">
					<label for="id_report">Isi Komplain</label>
					<textarea name="report" id="id_report" class="form-control" type="text" ng-model="newReport.report" placeholder="Isi Komplain" required></textarea>
					<div ng-messages="reportForm.report.$error">
						<div ng-message="required" ng-repeat="error in errors.report">{$error$}</div>
					</div>
				</md-input-container>
				<div layout="column" layout-align="center center">
					<md-button class="md-raised" ngf-select ng-model="files" ngf-multiple="true" flex>Unggah gambar</md-button>
				</div>
				<div layout="row" layout-align="center center" layout-wrap flex>
					<div flex="33" ng-repeat="file in files" layout-align="center center">
						<img ngf-thumbnail="file" class="upload-thumb">
					</div>
				</div>
				<div flex></div>
				<div layout="column" layout-align="center center">
				<div ng-show="errors" class="animated fadeIn">
					<p ng-show="errors.travel_destination" class="md-body-1">Harap masukan lokasi wisata yang tepat</p>
				</div>
				<div ng-if="complete == true">
					<p class="md-body-1">Komplain berhasil dibuat, terima kasih atas laporannya.</p>
				</div>
				<span ng-show="show_loading && !complete && errors.length == 0">
					<md-progress-circular md-mode="indeterminate"></md-progress-circular>
				</span>
				<div flex></div>
				<div layout="column" layout-align="center center">
					<md-button class="md-raised md-primary" ng-click="save()">Laporkan</md-button>
				</div>
					</div>
			</form>
		</div>
	</md-dialog-content>

</md-dialog>
`;

var visit_template = `
<md-dialog aria-label="komplain">
  <md-toolbar>
    <div class="md-toolbar-tools">
      <h2>Kunjungan</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="closeDialog()">
        <ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content id="report_view">
    <div class="md-dialog-content" layout="column" layout-align="center center">
      <form role="form" name="visitForm" ng-submit="save()" novalidate>
        <div layout="column" style="min-width: 400px" layout-align="center center" layout-margin>
          <h4>Kapan anda mengunjungi {$travel_destination.name$} ?</h4>
          <md-datepicker ng-model="date" md-placeholder="tanggal" md-max-date="max_date" flex></md-datepicker>
        </div>
        <md-input-container class="md-block">
          <label for="id_message">Pesan</label>
          <textarea name="message" id="id_message" type="text" ng-model="message" placeholder="opsional" class="form-control" required></textarea>
        </md-input-container>
        <div flex></div>
        <div layout="column" layout-align="center center">
          <div ng-if="complete == true">
            <p class="md-body-1">Terima kasih</p>
          </div>
				<span ng-show="show_loading && !complete && errors.length == 0">
					<md-progress-circular md-mode="indeterminate"></md-progress-circular>
				</span>
          <div flex></div>
          <div layout="column" layout-align="center center">
            <md-button class="md-raised md-primary" ng-click="save()">Ok</md-button>
          </div>
        </div>
      </form>
    </div>
  </md-dialog-content>

</md-dialog>
`;

var logout_template = `
<md-dialog aria-label="daftar">
  <md-toolbar>
    <div class="md-toolbar-tools">
      <h2>Peringatan</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="closeDialog()">
        <ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content layout="row" layout-align="center center" layout-margin layout-padding layout-wrap>
    <div flex="100">
      Anda yakin ingin keluar?
    </div>
    <div layout="row">
      <md-button ng-click="closeDialog()" class="md-raised md-primary">
        tidak
      </md-button>
      <md-button ng-click="logout()" class="md-raised md-accent">
        ya
      </md-button>
    </div>
  </md-dialog-content>
</md-dialog>
`;

var userprofile_template = `
<md-dialog aria-label="Mango (Fruit)" flex="grow" flex-gt-lg="30">
	<md-toolbar>
		<div class="md-toolbar-tools">
			<h2>Profil</h2>
			<span flex></span>
			<md-button class="md-icon-button" ng-click="closeDialog()">
				<ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
			</md-button>
		</div>
	</md-toolbar>
	<md-dialog-content>
		<md-tabs md-dynamic-height md-border-bottom>
			<md-tab label="profil">
				<md-content class="md-padding" ng-controller="UserprofileCtrl">
					<form role="form" name="userProfileForm" ng-submit="updateProfile(userProfileForm, model)" novalidate>

						<div class="md-dialog-content" layout="row" layout-wrap layout-align="center center">

							<md-input-container flex="100">
								<label for="id_first_name">Nama</label>
								<input name="first_name" id="id_first_name" class="form-control" type="text" ng-model="model.first_name" placeholder="Nama" />
								<div ng-messages="userProfileForm.first_name.$error">
									<div ng-message="required" ng-repeat="error in errors.first_name">{$error$}</div>
								</div>
							</md-input-container>
							<md-autocomplete flex="100"
															 md-search-text="district_search"
															 md-items="district in districts.results | filter:district_search | orderBy: 'name'"
															 md-item-text="district.name"
															 md-selected-item-change="hyperlinkedIt(district)"
															 md-min-length="0"
															 placeholder="Kabupaten"
															 md-floating-label="Kabupaten"
															 class="animated fadeIn">
								<md-item-template>
									<span class="animated fadeIn" md-highlight-text="district_search" md-highlight-flags="^i">{$district.name$}</span>
								</md-item-template>
								<md-not-found>
								</md-not-found>
							</md-autocomplete>
							<div ng-show="errors" class="animated fadeIn">
								<p class="md-body-1" ng-repeat="error in errors.non_field_errors">{$error$}</p>
								<p class="md-body-1" ng-if="error">{$error$}</p>
							</div>
							<div layout="column" layout-align="center center">
								<div ng-show="show_loading && errors.length == 0 && !complete">
									<md-progress-circular md-mode="indeterminate"></md-progress-circular>
								</div>
								<div ng-if="complete == true" flex="100" layout="row" layout-align="center center">
									<p class="md-body-1">Profil anda berhasil diperbaharui</p>
								</div>
								<md-button type="submit" ng-show="show_loading == false || errors" class="md-primary md-raised">Perbaharui profil</md-button>
							</div>
						</div>
					</form>
					<p class="md-body-1" ng-if="authenticated == false">Anda harus masuk terlebih dahulu</p>
				</md-content>
			</md-tab>
			<md-tab label="ubah password">
				<md-content class="md-padding" ng-controller="PasswordchangeCtrl">
					<form role="form" ng-submit="changePassword(changePasswordForm)" name="changePasswordForm" ng-if="authenticated" novalidate>

						<div class="md-dialog-content" layout="row" layout-wrap layout-align="center center">

							<md-input-container class="md-block" flex="100">
								<label for="id_password1">Password Baru</label>
								<input name="new_password1" id="id_password1" type="password" ng-model="model.new_password1" placeholder="Password Baru" class="form-control" required />
								<div ng-messages="changePasswordForm.new_password1.$error">
									<div ng-message="required" ng-repeat="error in errors.new_password1">{$error$}</div>
								</div>
							</md-input-container>
							<md-input-container class="md-block" flex="100">
								<label for="id_password2">Ulangi Password</label>
								<input name="new_password2" id="id_password2" type="password" ng-model="model.new_password2" placeholder="Ulangi Password" class="form-control" required />
								<div ng-messages="changePasswordForm.new_password2.$error">
									<div ng-message="required" ng-repeat="error in errors.new_password2">{$error$}</div>
								</div>
							</md-input-container>
							<div layout="column" layout-align="center center">
								<div ng-show="errors" class="animated fadeIn">
									<p class="md-body-1" ng-repeat="error in errors.non_field_errors">{$error$}</p>
									<div ng-if="errors.new_password2 != 'This field is required.'">
										<p class="md-body-1" ng-repeat="error in errors.new_password2">{$error$}</p>
									</div>
								</div>
								<div ng-if="complete == true">
									<p class="md-body-1">Password berhasil diubah!</p>
								</div>
							<div ng-show="show_loading && !complete && errors.length == 0">
								<md-progress-circular md-mode="indeterminate"></md-progress-circular>
							</div>
								<md-button class="md-raised md-accent" type="submit">ubah password</md-button>
							</div>
						</div>
					</form>
				</md-content>
			</md-tab>
			<md-tab label="Komplain">
				<md-content class="md-padding" ng-controller="ReportListCtrl" layout="row" layout-align="center center" layout-wrap>
					<h4 class="md-subheading">Tanda ceklis menandakan komplain anda sudah berhasil diverifikasi. Terima kasih atas kontribusinya.</h4>
					<md-list flex="100">
						<div dir-paginate="report in reports_resolved | itemsPerPage: 4" pagination-id="report">
							<md-list-item class="md-3-line md-long-text" ng-controller="ReportListRepeatCtrl" flex>
								<img ng-src="{$image.image$}" class="md-avatar" alt="" style="color: grey"/>
								<div class="md-list-item-text">
									<h3>{$ travel_destination.name $}</h3>
									<p>
										{$report.created_date | date:'d  MMMM  yyyy'$}<br>
										{$report.report$}
										<md-checkbox class="md-secondary" ng-model="report.approved" ng-disabled="true"></md-checkbox>
									</p>
								</div>
							</md-list-item>
						</div>
					</md-list>
					<div max-size="5" flex="100" layout-align="center-center" layout="row">
						<dir-pagination-controls pagination-id="report" layout="row" layout-align="center center"></dir-pagination-controls>
					</div>
				</md-content>
			</md-tab>
		</md-tabs>
	</md-dialog-content>
</md-dialog>

`;

var register_template = `
<md-dialog aria-label="daftar">
	<md-toolbar>
		<div class="md-toolbar-tools">
			<h2>Registrasi</h2>
			<span flex></span>
			<md-button class="md-icon-button" ng-click="closeDialog()">
				<ng-md-icon icon="close" aria-label="close dialog"></ng-md-icon>
			</md-button>
		</div>
	</md-toolbar>
	<md-dialog-content class="md-dialog-content-register" id="register_view" ng-controller="RegisterCtrl">
		<form role="form" ng-if="authenticated != true" name="registerForm" ng-submit="register(registerForm)" novalidate>

			<div class="md-dialog-content" layout="column" layout-align="center center">

				<md-input-container class="md-block">
					<label for="id_username">Username</label>
					<input name="username" id="id_username" class="form-control" type="text" ng-model="model.username" placeholder="Username" required auto-focus/>
					<div ng-messages="registerForm.username.$error">
						<div ng-message="required" ng-repeat="error in errors.username">{$error$}</div>
					</div>
				</md-input-container>
				<md-input-container class="md-block">
					<label for="id_password">Password</label>
					<input name="password1" id="id_password1" class="form-control" type="password" ng-model="model.password1" placeholder="Password" required />
					<div ng-messages="registerForm.password1.$error">
						<div ng-message="required" ng-repeat="error in errors.password1">{$error$}</div>
					</div>
				</md-input-container>
				<md-input-container class="md-block">
					<label for="id_password">Ulangi Password</label>
					<input name="password" id="id_password2" class="form-control" type="password" ng-model="model.password2" placeholder="Ulangi Password" required />
					<div ng-messages="registerForm.password.$error">
						<div ng-message="required" ng-repeat="error in errors.password">{$error$}</div>
					</div>
				</md-input-container>
				<md-input-container class="md-block">
					<label for="id_email">Email</label>
					<input name="email" id="id_email" class="form-control" type="email" ng-model="model.email" placeholder="Email" required />
					<div ng-messages="registerForm.email.$error">
						<div ng-message="required" ng-repeat="error in errors.email">{$error$}</div>
						<div ng-message="email" ng-repeat="error in errors.email">{$error$}</div>
					</div>
				</md-input-container>
				<div ng-show="errors" class="animated fadeIn">
					<p class="md-body-1" ng-repeat="error in errors.non_field_errors">{$error$}</p>
					<p class="md-body-1" ng-repeat="error in errors.__all__">{$error$}</p>
					<div ng-if="errors.username != 'This field is required.'">
						<p class="md-body-1" ng-repeat="error in errors.username">{$error$}</p>
					</div>
					<div ng-if="errors.email != 'This field is required.'">
						<p class="md-body-1" ng-repeat="error in errors.email">{$error$}</p>
					</div>
				</div>
				<div ng-if="complete == true">
						<p class="md-body-1">Cek email untuk aktivasi akun anda!</p>
				</div>
				<span ng-show="show_loading && !complete && errors.length == 0">
					<md-progress-circular md-mode="indeterminate"></md-progress-circular>
				</span>
				<md-button class="md-raised md-primary" type="submit">daftar</md-button>
			</div>
		</form>
	</md-dialog-content>

</md-dialog>
`;

