'use strict';
angular.module('myApp.pressHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/presshome', {
    templateUrl: 'pressHome/pressHome.html',
    controller: 'pressHomeCtrl'
  });
}])

.controller('pressHomeCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
