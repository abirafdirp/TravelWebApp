var kompresControllers = angular.module('kompresControllers', []);

kompresControllers.controller('NavCtrl', ['$scope', '$route', '$mdDialog', 'ArticleSearch', 'TravelDestinationSearch', '$mdSidenav', 'djangoAuth',
  function($scope, $route, $mdDialog, ArticleSearch, TravelDestinationSearch, $mdSidenav, djangoAuth) {
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
        templateUrl: '/partials/logout/',
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

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.reset_logout_clicked = function() {
      $scope.logout_clicked = false;
    };
    $scope.showLogin = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/partials/login/',
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
        templateUrl: '/partials/register/',
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
        templateUrl: '/partials/userprofile/',
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
          templateUrl: '/partials/visit/',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
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
        templateUrl: '/partials/report/',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
      });
      function DialogController($scope, $mdDialog, Districts, Reports, TravelDestinations, $rootScope, Upload, travel_destination_local) {
        $scope.uploadCount = 0;
        $scope.travel_destination_local = travel_destination_local;
        $scope.upload = function (file, report) {
          Upload.upload({
            url: '/api/reportimages/',
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
                $scope.report = '/api/reports/' + result.id + '/';
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

