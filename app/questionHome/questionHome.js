'use strict';
angular.module('myApp.questionHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questionHome', {
    templateUrl: 'questionHome/questionHome.html',
    controller: 'questionHomeCtrl'
  });
}])

.controller('questionHomeCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
