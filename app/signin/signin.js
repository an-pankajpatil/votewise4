'use strict';
angular.module('myApp.localPress', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'signinCtrl'
  });
}])

.controller('signinCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {
  $scope.signin = ( user ) => {
    const data = {
      password: user.password,
      email: user.email
    };
  const request = apiCall.apiCall('POST', '/authenticate', data);
  $http(
    request
  ).then(function successCallback(response) {
    apiCall.saveToken(response.data.token);
    $location.path('/debateHome');
 }, function errorCallback(response) {
    $scope.error = 'Wrong Email or Password';
 });
  }
}]);
