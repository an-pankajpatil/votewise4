'use strict';
angular.module('myApp.localDebate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/localDebate', {
    templateUrl: 'localDebate/localDebate.html',
    controller: 'localDebateCtrl'
  });
}])

.controller('localDebateCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
