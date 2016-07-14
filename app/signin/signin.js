'use strict';
angular.module('myApp.localPress', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'signinCtrl'
  });
}])

.controller('signinCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {
  
  $scope.checkLogin = function(){
    $scope.isLoggedIn =  apiCall.getToken() ? true : false;
  };
  $scope.checkLogin();
  
  $scope.signin = ( user ) => {
    console.log("Sign in", user);

    const data = {
      password: user.password,
      username: user.username
    };
    const request = apiCall.apiCall('POST', '/user/authenticate', data);
    $http(
      request
    ).then(function successCallback(response) {
      console.log("succss: ",response);
      if(response.data.success){
        apiCall.saveToken(response.data.token);
        //$location.path('/debateHome');
        $location.path('/questionHome');
        console.log("Logged in successfully.");
        $scope.checkLogin();
      }
      else{
        $scope.error = response.data.error;
      }
    }, function errorCallback(response) {
      $scope.error = 'Wrong Email or Password';
    });
    
  }

  $scope.signout =function(){
    apiCall.destroyToken();
    $scope.checkLogin();
  };
}]);
