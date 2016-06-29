'use strict';
angular.module('myApp.learnHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/learnHome', {
    templateUrl: 'learnHome/learnHome.html'
  }),
  $routeProvider.when('/wheretovote', {
    templateUrl: 'learnHome/WhereToVote.html'
  }),
  $routeProvider.when('/wheretogetnews', {
    templateUrl: 'learnHome/WhereToGetNews.html'
  }),
  $routeProvider.when('/fakenews', {
    templateUrl: 'learnHome/FakeNews.html'
  }),
  $routeProvider.when('/factchecking', {
    templateUrl: 'learnHome/FactChecking.html'
  }),
  $routeProvider.when('/politicalDictionary', {
    templateUrl: 'learnHome/PoliticalDictionary.html'
  }),
  $routeProvider.when('/aboutus', {
    templateUrl: 'learnHome/AboutUs.html'
  });

}])
