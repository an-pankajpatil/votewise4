'use strict';

angular.module('myApp.welcomeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcomeView/welcomeView.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', [function() {

}]);
