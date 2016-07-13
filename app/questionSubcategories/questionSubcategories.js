'use strict';
angular.module('myApp.questionSubcategories', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questionSubcategories/:categoryId', {
    templateUrl: 'questionSubcategories/questionSubcategories.html',
    controller: 'questionSubcategoriesCtrl'
  });
}])
.controller('questionSubcategoriesCtrl', ['$scope','$http','$location','apiCall', '$routeParams', '$q', function ($scope, $http, $location, apiCall, $routeParams, $q) {
	console.log("** questionSubcategoriesCtrl ** :",$routeParams);

	function getSubCategories(params) {
	  const request = apiCall.apiCall('GET', '/categories/list', {parentId: $routeParams.categoryId});
	  $http(
	    request
	  ).then(function successCallback(response) {
		// console.log("Got categories: ",response);
		if(response.data.success){
			$scope.subCategories = response.data.data;
		}
		else{
			console.log("Something went wrong: ",response.data);
		}
	  }, function errorCallBack(response) {
	    console.log("Error: ",response);
	  });
	}

	function getCategory(params) {
	  const request = apiCall.apiCall('GET', '/categories/list', {id: $routeParams.categoryId});
	  $http(
	    request
	  ).then(function successCallback(response) {
		// console.log("Got categories: ",response);
		if(response.data.success){
			$scope.category = response.data.data;
		}
		else{
			console.log("Something went wrong: ",response.data);
		}
	  }, function errorCallBack(response) {
	    console.log("Error: ",response);
	  });
	}

	if($routeParams.categoryId){
		getCategory();
		getSubCategories();
	}
}]);
