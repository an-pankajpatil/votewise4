'use strict';
angular.module('myApp.advocateHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/advocateHome', {
    templateUrl: 'advocateHome/advocateHome.html',
    controller: 'advocateHomeCtrl'
  });
}])

.controller('advocateHomeCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
