var hateoasDrfService = angular.module('hateoasDrfService', ['ngResource']);

hateoasDrfService.factory('apiService', ['traverson', function (traverson) {

    return {
        getRelated: function (url, related_field) {
             traverson
                    .from('http://127.0.0.1:8000/api/provinces/1/')
                    .useAngularHttp()
                    .newRequest()
                    .follow(related_field)
                    .getResource()
                    .result
                    .then(function(document) {
                        console.log('We have followed the path and reached our destination.')
                        console.log(JSON.stringify(document))
                    }, function(err) {
                        console.error('No luck');
                    });
        }
    }
}]);