var kompresServices = angular.module('kompresServices', ['ngResource']);

kompresServices.service('ColorRandomizer', ['$rootScope',
  function($rootScope) {
    // this service will provide not repeating random colors
    // remember to pick dark colors
    // 1 red 2 blue-grey 3 orange 4 indigo 5 purple
    // all colors above are material's colors
    this.colors = [
        '#F44336',
        '#607D8B',
        '#ff5722',
        '#3f51b5',
        '#673ab7',
        '#2196F3'
    ];
    // must be list of index of colors
    this.colors_index = [0,1,2,3,4,5];
    this.colors_index_counter = -1;
    this.colors_index = $rootScope.shuffle(this.colors_index);
    this.getColor = function(){
      this.colors_index_counter += 1;
      if (this.colors_index_counter == this.colors_index.length){
        this.colors_index_counter = 0;
        this.colors_index = $rootScope.shuffle(this.colors_index);
      }
      return this.colors[this.colors_index[this.colors_index_counter]];
    }
  }
]);


kompresServices.service('PostCategory', ['$rootScope', 'ColorRandomizer',
  function($rootScope, ColorRandomizer) {
    this.categories = [];
    this.colors = [];
    this.addCategory = function(category) {
      if (!$rootScope.arrayContains(this.categories, category)){
        this.categories.push(String(category));
        this.colors.push(ColorRandomizer.getColor());
      }
    };
    this.getCategories = function(){
      return this.categories;
    };
    this.getColors = function(){
      return this.colors;
    };
  }
]);

kompresServices.service('Marker', ['$resource', '$rootScope',
  function($resource, $rootScope) {
    this.markers = [];

    function Marker(id, latitude, longitude, thumbnail_image, short_description, name, type) {
      this.id = id;
      this.latitude = latitude;
      this.longitude = longitude;
      this.name = name;
      this.type = type;
      this.short_description = short_description;
      this.thumbnail_image = thumbnail_image;
      this.name_slugified = $rootScope.slugify(name);
      if (type.toLowerCase() == 'wisata'){
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png'
      }
      if (type.toLowerCase() == 'belanja'){
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/shopping.png'
      }
      if (type.toLowerCase() == 'aktifitas'){
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/cycling.png'
      }
      if (type.toLowerCase() == 'museum'){
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png'
      }
      if (type.toLowerCase() == 'point of interest'){
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/POI.png'
      }
      if (type.toLowerCase() == 'lokasi historis') {
        this.icon = 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'
      }
    }

    this.getMarkers = function(){
      return this.markers;
    };

    this.addMarker = function(obj){
      this.markers.push(new Marker(obj.id, obj.latitude, obj.longitude, obj.thumbnail_image, obj.short_description, obj.name, obj.type));
    };

    this.clearMarkers = function() {
      this.markers = [];
    }
  }
]);

kompresServices.service('TransportationSearch', [
  function() {
    this.search = '';

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
    };

  }
]);

kompresServices.service('ArticleSearch', [
  function() {
    this.search_icon = 'search';
    this.category_search = '';

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


    this.getCategoryIcon = function (category) {
      if (this.category_search == category){
        return 'keyboard_tab';
      }
      else {
        return 'keyboard_arrow_right';
      }
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

    this.clearRegionSearch = function() {
      if(this.region_search != null){
        this.region_search = '';
      }
    };

    this.setRegionSearch = function(search) {
      this.region_search = search;
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

kompresServices.factory('TravelDestinationContents', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/traveldestinationcontents/?format=json', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/traveldestinationcontents/?travel_destination=:travel_destination_name', {
        travel_destination_name:'@travel_destination_name'
      }, {
      query: {method: 'GET'}
      })
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

kompresServices.factory('Transportations', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/transportations/?format=json', {}, {
      query: {method: 'GET'}
      }),
      district : $resource('/api/transportations/?district=:district', {
        district:'@district'
      }, {
      query: {method: 'GET'}
      })
    }
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
  function($resource) {
    return {
      list : $resource('/api/districts/?format=json&fields=id,name,latitude,longitude,province,region', {}, {
      query: {method: 'GET'}
      }),
      transport : $resource('/api/districts/?transportation=:transportation', {
        transportation:'@transportation'
      }, {
      query: {method: 'GET'}
      })
    }
  }
]);

kompresServices.factory('TravelDestinations', ['$resource',
  function($resource) {
    return {
      list : $resource('/api/traveldestinations/?format=json&fields=id,latitude,longitude,name,district,short_description,type,thumbnail', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/traveldestinations/?name=:travel_destination_name', {
        travel_destination_name:'@travel_destination_name'
      }, {
      query: {method: 'GET'}
      }),
      model : $resource('/api/traveldestinations/?name=:travel_destination_name&fields=model_3d', {
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
  function($resource) {
    return {
      list : $resource('/api/users/?format=json', {}, {
      query: {method: 'GET'}
      }),
      detail : $resource('/api/users/?username=:username', {
        user:'@user'
      }, {
      query: {method: 'GET'}
      })
    }
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