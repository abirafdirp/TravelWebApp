var kompresControllers = angular.module('kompresControllers', []);

kompresControllers.controller('NavCtrl', ['$scope', '$route',
  function($scope, $route) {
    $scope.$route = $route;
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

kompresControllers.controller('TravelDestinationsCtrl', ['$scope', 'TravelDestinations',
  function($scope, TravelDestinations) {
    $scope.travel_destinations = TravelDestinations.query();
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