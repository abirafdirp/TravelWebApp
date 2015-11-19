var kompresControllers = angular.module('kompresControllers', []);

kompresControllers.controller('NavCtrl', ['$scope', '$route', '$mdDialog',
  function($scope, $route, $mdDialog) {
    $scope.$route = $route;
    $scope.logout_clicked = false;
    $scope.traveldestination_icon = 'terrain';
    $scope.article_icon = 'my_library_books';
    $scope.map_icon = 'directions';
    $scope.info_icon = 'info';

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

kompresControllers.controller('HomePageCtrl', ['$scope', 'HomePage',
  function($scope, HomePage) {
    $scope.homepage = HomePage.query();
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

kompresControllers.controller('TravelDestinationsCtrl', ['$scope', '$route', '$routeParams', 'TravelDestinations',
  function($scope, $route, $routeParams, TravelDestinations) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.travel_destination_name = $scope.params.travel_destination_name;

    if (!$scope.travel_destination_name){
      $scope.travel_destinations = TravelDestinations.list.query();
    }
    else {
      $scope.travel_destination = TravelDestinations.detail.query({travel_destination_name:$scope.travel_destination_name})
    }
  }
]);

kompresControllers.controller('ArticlesCtrl', ['$scope', '$route', '$routeParams', '$resource', '$q', 'Articles',
  function($scope, $route, $routeParams, $resource, $q, Articles) {
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.currentURL = null;

    if (typeof $scope.params.article_name == 'undefined'){
      $scope.articles = Articles.list.query();
    }
    else {
      $scope.article_name = $scope.params.article_name.replace(/-/g,' ');
      $scope.article = Articles.detail.query({article_name:$scope.article_name});
      $scope.article.$promise.then(function() {
        console.log($scope.article.results[0]);
        var url = $scope.article.results[0].main_image+'?format=json';
        $scope.main_image = $resource(url).get();
      });
    }
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

kompresControllers.controller('TravelDestinationMainImagesCtrl', ['$scope', 'TravelDestinationMainImages',
  function($scope, TravelDestinationMainImages) {
    $scope.travel_destination_main_images = TravelDestinationMainImages.query();
  }
]);

kompresControllers.controller('TravelDestinationWhatToDoImagesCtrl', ['$scope', 'TravelDestinationWhatToDoImages',
  function($scope, TravelDestinationWhatToDoImages) {
    $scope.travel_destination_what_to_do_images = TravelDestinationWhatToDoImages.query();
  }
]);

kompresControllers.controller('TravelDestinationWhatToDoImagesCtrl', ['$scope', 'TravelDestinationWhatToDoImages',
  function($scope, TravelDestinationWhatToDoImages) {
    $scope.travel_destination_what_to_do_images = TravelDestinationWhatToDoImages.query();
  }
]);

kompresControllers.controller('FeaturedTravelDestinationCtrl', ['$scope', 'FeaturedTravelDestinations',
  function($scope, FeaturedTravelDestinations) {
    $scope.featured_travel_destinations = FeaturedTravelDestinations.query();
  }
]);