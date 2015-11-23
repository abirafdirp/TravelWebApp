var kompresControllers = angular.module('kompresControllers', []);

kompresControllers.controller('NavCtrl', ['$scope', '$route', '$mdDialog', 'ArticleSearch', 'TravelDestinationSearch',
  function($scope, $route, $mdDialog, ArticleSearch, TravelDestinationSearch) {
    $scope.$route = $route;
    $scope.logout_clicked = false;
    $scope.traveldestination_icon = 'terrain';
    $scope.article_icon = 'my_library_books';
    $scope.map_icon = 'directions';
    $scope.info_icon = 'info';
    $scope.ArticleSearch = ArticleSearch;
    $scope.TravelDestinationSearch = TravelDestinationSearch;

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


kompresControllers.controller('TravelDestinationListCtrl', ['$scope', '$route', '$routeParams', '$resource', '$rootScope', 'TravelDestinations', 'Districts', 'Provinces', 'Regions',
  function($scope, $route, $routeParams, $resource, $rootScope, TravelDestinations, Districts, Provinces, Regions) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.show_loading = true;
    $scope.travel_destination_name = $scope.params.travel_destination_name;
    $scope.search = $scope.params.search;
    $scope.categories = [];

    $scope.districts = Districts.query();
    $scope.provinces = Provinces.query();
    $scope.regions = Regions.query();

    $scope.category_icon = 'keyboard_arrow_right';
    $scope.all_category_icon = 'keyboard_arrow_right';

    $scope.travel_destinations = TravelDestinations.list.query();
    $scope.travel_destinations.$promise.then(function(){
      angular.forEach($scope.travel_destinations.results, function(item){
        if ($rootScope.arrayContains($scope.categories, item.type) == false){
          $scope.categories.push(String(item.type));
        }
        item['district_name'] = $resource(item.district).get(function(){
          item['province'] = $resource(item.district_name.province).get(function(){
            item['region'] = $resource(item.province.region).get();
          })
        });
      });
      $scope.show_loading = false;
    });
  }
]);

kompresControllers.controller('TravelDestinationDetailCtrl', ['$scope', '$route', '$routeParams', 'TravelDestinations', 'TravelDestinationContents',
  function($scope, $route, $routeParams, TravelDestinations, TravelDestinationContents) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.travel_destination_name = $scope.params.travel_destination_name.replace(/-/g,' ');

    $scope.travel_destination = TravelDestinations.detail.query({travel_destination_name:$scope.travel_destination_name})
    $scope.travel_destination.$promise.then(function() {
      var url = $scope.travel_destination.results[0].district+'?format=json';
      $scope.district = $resource(url).get();
    });
    $scope.travel_destination_contents = TravelDestinationContents.detail.query({travel_destination_name:$scope.travel_destination_name});
  }
]);

kompresControllers.controller('TravelDestinationRepeatCtrl', ['$scope', '$resource', '$exceptionHandler',
  function($scope, $resource, $exceptionHandler) {
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
      $scope.district = $resource($scope.travel_destination.district).get();
      $scope.thumbnail = $resource($scope.travel_destination.thumbnail).get();
    };

    init();
  }
]);

kompresControllers.controller('ArticleListCtrl', ['$scope', '$route', '$routeParams', '$resource', '$timeout', '$filter', 'Articles', 'PostCategory',
  function($scope, $route, $routeParams, $resource, $timeout, $filter, Articles, PostCategory) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.show_loading = true;
    $scope.categories = PostCategory.getCategories();
    $scope.search = $scope.params.search;
    $scope.color = 'md-warn';

    $scope.category_icon = 'keyboard_arrow_right';
    $scope.all_category_icon = 'keyboard_arrow_right';

    $scope.setColor = function (index){
      if (index == 0){
        return 'material-blue';
      }
      else if(index == 1) {
        return 'material-indigo';
      }
      else if(index == 2){
        return 'material-blue-grey'
      }
      else {
        return 'material-deep-purple';
      }
    };

    $scope.articles = Articles.list.query();
    $scope.articles.$promise.then(function() {
        angular.forEach($scope.articles.results, function(item){
          item.date = $filter('date')(item.date, 'd  MMMM  yyyy');
        });
        $scope.show_loading = false;
    });
  }
]);

kompresControllers.controller('ArticleDetailCtrl', ['$scope', '$route', '$routeParams', '$resource', 'Articles',
  function($scope, $route, $routeParams, $resource, Articles) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.show_loading = true;
    $scope.article_name = $scope.params.article_name.replace(/-/g,' ');
    $scope.article = Articles.detail.query({article_name:$scope.article_name});
    $scope.article.$promise.then(function() {
      $scope.main_image = $resource($scope.article.results[0].main_image+'?format=json').get(function() {
        $scope.show_loading = false;
      });
    });
  }
]);

kompresControllers.controller('ArticleRepeatCtrl', ['$scope', '$resource', '$exceptionHandler', 'PostCategory',
  function($scope, $resource, $exceptionHandler,  PostCategory) {
    var init = function() {
      if (typeof $scope.article === "undefined") {
        $exceptionHandler("The ArticleRepeatController must be initialized with a article in scope");
      }
      $scope.articleInRepeat = $scope.article;
      $scope.show_loading = true;
      if($scope.article.short_description.length > 180){
        $scope.article_short_description = $scope.article.short_description.substring(0,180) + ' ...';
      }
      else{
        $scope.article_short_description = $scope.article.short_description;
      }
      PostCategory.addCategory($scope.article.category);
      $scope.thumbnail = $resource($scope.article.thumbnail).get(function() {
        $scope.show_loading = false;
      });
    };
    init();
  }
]);

kompresControllers.controller('VisitsCtrl', ['$scope', 'Visits',
  function($scope, Visits) {
    $scope.visits = Visits.query();
  }
]);

kompresControllers.controller('ReportsCtrl', ['$scope', 'Reports',
  function($scope, Reports) {
    $scope.reports = Reports.query();
  }
]);

kompresControllers.controller('UsersCtrl', ['$scope', 'Users',
  function($scope, Users) {
    $scope.users = Users.query();
  }
]);

kompresControllers.controller('ReportImagesCtrl', ['$scope', 'ReportImages',
  function($scope, ReportImages) {
    $scope.report_images = ReportImages.query();
  }
]);

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

kompresControllers.controller('SearchCtrl', ['$scope', 'ArticleSearch', '$timeout', 'TravelDestinationSearch',
  function($scope, ArticleSearch, $timeout, TravelDestinationSearch) {
    $scope.ArticleSearch = ArticleSearch;
    $scope.TravelDestinationSearch = TravelDestinationSearch;
    $scope.search_opened = false;
    $scope.search_icon = 'search';

    $scope.toggleSearch = function (){
        $scope.search_opened = !$scope.search_opened;
        if ($scope.search_opened){
          $scope.search_icon = 'close';
        }
        else {
          $scope.search_icon = 'search';
        }
    }
  }
]);


