'use strict';
angular.module('myApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question/:categoryId', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])
.controller('questionCtrl', ['$scope','$http','$location','apiCall', '$routeParams', '$q', function ($scope, $http, $location, apiCall, $routeParams, $q) {
	console.log("** questionCtrl ** :",$routeParams);
	
	$scope.currentIndex = 0;
	
	function getQuestions(params) {
	  const request = apiCall.apiCall('GET', '/questions/list', {categoryId: $routeParams.categoryId});
	  $http(
	    request
	  ).then(function successCallback(response) {
		// console.log("Got categories: ",response);
		if(response.data.success){
			$scope.questions = response.data.data;
			console.log("total questions: ", $scope.questions.length);
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
		getQuestions();
		getCategory();
	}

	$scope.submitAnswer = function(){
		console.log("submitAnswer: "+$scope.answer);
		console.log("importance: "+$scope.importance);
	};

	$scope.skipQuestion = function(){
		var tempIndex = $scope.currentIndex+1;
		if(tempIndex < $scope.questions.length){
			$scope.currentIndex++;
		}
	};

	$scope.prevQuestion = function(){
		if($scope.currentIndex > 0){
			$scope.currentIndex--;
		}
	};

	
}]);
