'use strict';
angular.module('myApp.questionHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questionHome', {
    templateUrl: 'questionHome/questionHome.html',
    controller: 'questionHomeCtrl'
  });
}])
.controller('questionHomeCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {
	console.log("** questionHomeCtrl **");

	function getCategories(params) {
	  const request = apiCall.apiCall('GET', '/categories/list', {root: 1});
	  $http(
	    request
	  ).then(function successCallback(response) {
		// console.log("Got categories: ",response);
		if(response.data.success){
			$scope.categories = response.data.data;
		}
		else{
			console.log("Something went wrong: ",response.data);
		}
	  }, function errorCallBack(response) {
	    console.log("Error: ",response);
	  });
	}

	getCategories();
}]);
