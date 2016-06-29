'use strict';
angular.module('myApp.localPress', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/localpress', {
    templateUrl: 'localPress/localPress.html',
    controller: 'localPressCtrl'
  });
}])

.controller('localPressCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {

}]);
