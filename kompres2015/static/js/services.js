var kompresServices = angular.module('kompresServices', ['ngResource']);

kompresServices.service('PostCategory', ['$rootScope',
  function($rootScope) {
    this.categories = [];
    this.addCategory = function(category) {
      if (!$rootScope.arrayContains(this.categories, category)){
        this.categories.push(String(category));
      }
    };
    this.getCategories = function(){
      return this.categories;
    }
  }
]);

kompresServices.factory('Regions', ['$resource',
  function($resource){
    return $resource('/api/regions/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Provinces', ['$resource',
  function($resource){
    return $resource('/api/provinces/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Districts', ['$resource',
  function($resource){
    return $resource('/api/districts/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('TravelDestinations', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/traveldestinations/?format=json', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/traveldestinations/?name=:travel_destination_name', {
        travel_destination_name:'@travel_destination_name'
      }, {
      query: {method: 'GET'}
      })
    }
  }
]);

kompresServices.factory('TravelDestinationsContents', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/traveldestinationcontents/?format=json', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/traveldestinationcontents/?name=:travel_destination_name', {
        travel_destination_name:'@travel_destination_name'
      }, {
      query: {method: 'GET'}
      })
    }
  }
]);

kompresServices.factory('Articles', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/articles/?format=json&fields=title,author,category,short_description,main_image,created_date', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/articles/?title=:article_name', {
        article_name:'@article_name'
      }, {
      query: {method: 'GET'}
      })
    }
  }
]);

kompresServices.factory('Visits', ['$resource',
  function($resource){
    return $resource('/api/visits/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Reports', ['$resource',
  function($resource){
    return $resource('/api/reports/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Users', ['$resource',
  function($resource){
    return $resource('/api/users/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('ReportImages', ['$resource',
  function($resource){
    return $resource('/api/reportimages/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Images', ['$resource',
  function($resource){
    return $resource('/api/Images/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('ArticleMainImages', ['$resource',
  function($resource){
    return $resource('/api/articlemainimages/?format=json', {}, {
      query: {method:'GET', isArray: true}
    })
  }
]);

kompresServices.factory('TravelDestinationMainImages', ['$resource',
  function($resource){
    return $resource('/api/traveldestinationmainimages/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('TravelDestinationWhatToDoImages', ['$resource',
  function($resource){
    return $resource('/api/traveldestinationwhattodoimages/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('TravelDestinationGalleryImages', ['$resource',
  function($resource){
    return $resource('/api/traveldestinationgalleryimages/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('FeaturedTravelDestinations', ['$resource',
  function($resource){
    return $resource('/api/featuredtraveldestinations/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);

kompresServices.factory('Page', ['$resource',
  function($resource){
    return $resource('/api/pages/?format=json', {}, {
      query: {method:'GET'}
    })
  }
]);