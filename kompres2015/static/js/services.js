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

kompresServices.service('ArticleSearch', [
  function() {
    this.search_icon = 'search';

    this.clearSearch = function() {
      if(this.search != null){
        this.search = '';
        this.search_icon = 'close';
      }
    };

    this.setSearch = function(search) {
      this.search = search;
    };

    this.clearCategorySearch = function() {
      if(this.category_search != null){
        this.category_search = '';
      }
    };

    this.setCategorySearch = function(search) {
      this.category_search = search;
    };

    this.clearAllSearch = function() {
      this.search = '';
      this.category_search = '';
    };
  }
]);

kompresServices.service('TravelDestinationSearch', [
  function() {
    this.category_search = '';
    this.district_search = '';
    this.province_search = '';
    this.region_search = '';

    this.clearCategorySearch = function() {
      if(this.category_search != null){
        this.category_search = '';
      }
    };

    this.setCategorySearch = function(search) {
      this.category_search = search;
    };

    this.clearDistrictSearch = function() {
      if(this.district_search != null){
        this.district_search = '';
      }
    };

    this.setDistrictSearch = function(search) {
      this.district_search = search;
    };

    this.clearSearch = function() {
      if(this.search != null){
        this.search = '';
      }
    };

    this.setSearch = function(search) {
      this.search = search;
    };

    this.clearAllSearch = function() {
      this.search = '';
      this.category_search = '';
      this.district_search = '';
      this.province_search = '';
      this.region_search = '';
    };
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
      list : $resource('/api/traveldestinations/?format=json&fields=name,district,short_description,type,thumbnail', {}, {
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
      list : $resource('/api/articles/?format=json&fields=title,author,category,short_description,date,thumbnail', {}, {
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

kompresServices.factory('ArticleImages', ['$resource',
  function($resource){
    return $resource('/api/articleimages/?format=json', {}, {
      query: {method:'GET', isArray: true}
    })
  }
]);

kompresServices.factory('TravelDestinationImages', ['$resource',
  function($resource){
    return $resource('/api/traveldestinationimages/?format=json', {}, {
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