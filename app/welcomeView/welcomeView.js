'use strict';

angular.module('myApp.welcomeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcomeView/welcomeView.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', 'apiCall', '$location', function($scope, apiCall, $location) {
  // const returningUser = apiCall.getToken();
  //
  // if (returningUser) {
  //   $location.path('/debateHome');
  // }
}]);
