'use strict';
angular.module('myApp.debateHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/debateHome', {
    templateUrl: 'debateHome/debateHome.html',
    controller: 'debateHomeCtrl'
  });
}])

.controller('debateHomeCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
