'use strict';

// Declare app level module which depends on views, and components
const mainApp = angular.module('myApp', [
  'ngRoute',
  'myApp.welcomeView',
  'myApp.voterSignup',
  'myApp.politicianSignup',
  'myApp.advocateSignup',
  'myApp.version',
  'myApp.questionHome',
  'myApp.debateHome',
  'myApp.localDebate',
  'myApp.learnHome',
  'myApp.pressHome',
  'myApp.localPress',
  'myApp.advocateHome'
]);

mainApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/welcome'});
}]);

mainApp.factory('apiService', function() {
  const factory = {};

  factory.log = function() {
    console.log('haaaay');
  }

  factory.constants = () => {
    return {
      regex: {
          username: /^[a-z][\w\.]{1,25}$/,
          password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Contain 8 charectors, 1 uppercase
          email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          city: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
      }
    }
  }

  factory.apiCall = (verb, url, data, headers) => {
    console.log(verb, url, data, headers);
    const root = 'http://localhost:8080';
    return {
      method: verb,
      url: root + url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: data
    }
  }

  return factory;
});

mainApp.service('apiCall', function(apiService){
  this.apiCall = (verb, url, data, headers) => {
    return apiService.apiCall(verb, url, data, headers);
  }
  this.constants = () => {
    return apiService.constants();
  }
  // this.validateEmail = (email, msg) => {
  //   return apiService.validateEmail(email, msg);
  // }
});
