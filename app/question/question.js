'use strict';
angular.module('myApp.question', ['ngRoute', 'ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question/:categoryId', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])
.controller('questionCtrl', ['$scope','$http','$location','apiCall', '$routeParams', '$q', 'ngDialog', function ($scope, $http, $location, apiCall, $routeParams, $q, ngDialog) {
	console.log("** questionCtrl ** :",$routeParams);
	
	$scope.currentIndex = 0;
	$scope.initializeVariables = function(){
		$scope.importance = null;
		$scope.answer = null;
		$scope.comment = '';
	};
	$scope.initializeVariables();

	
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

	$scope.notAnswerableSelected = function(){
		if($scope.answer == 0){
			var message = 'Many of our Statements have an undeniable fact followed by an opinion.  Like “the sky is blue.  I hate the sky.”  If this is your problem with the question, then realize that this is just part of the question process and just respond to the second half.  If not, please explain the problem in the “add comments” section so we can fix it.  Thank you.';
			var modal = ngDialog.openConfirm({
		    	template:'<p>'+message+'</p>\
			            <div class="ngdialog-buttons">\
		                	<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">OK</button>\
			            </div>',
			    plain: true
			});
			
			modal.then(function fullfilled(data){
				console.log("fullfilled: ",data);
			}, function rejected(data){
				console.log("rejected: ",data);
			});
		}
	};

	$scope.postAnswer = function(postData){
		console.log("postData: ",postData);

	    const request = apiCall.apiCall('POST', '/answers/create', postData);
	    $http(
	      request
	    ).then(function successCallback(response) {
	      console.log("succss: ",response);
	      if(response.data.success){
	        alert("Answered successfully");
	        $scope.initializeVariables();
	      }
	      else{
	        alert("Error: "+response.data.error);
	      }
	    }, function errorCallback(response) {
	      $scope.error = 'Wrong Email or Password';
	    });
	    
	};

	$scope.submitAnswer = function(){
		console.log("submitAnswer: "+$scope.answer);
		console.log("importance: "+$scope.importance);
		console.log("comments: ", $scope.comment);

		var token = apiCall.getToken();

		if(!token || token == ""){
			var message = "Pleae login first.";

			var modal = ngDialog.openConfirm({
		    	template:'<p>'+message+'</p>\
			            <div class="ngdialog-buttons">\
		                	<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">OK</button>\
			            </div>',
			    plain: true
			});
			
			modal.then(function fullfilled(data){
				console.log("fullfilled: ",data);
			}, function rejected(data){
				console.log("rejected: ",data);
			});
			
			return;
		}

		if($scope.answer == null){
			
			var message = "Pleae select answer first.";

			var modal = ngDialog.openConfirm({
		    	template:'<p>'+message+'</p>\
			            <div class="ngdialog-buttons">\
		                	<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">OK</button>\
			            </div>',
			    plain: true
			});
			
			modal.then(function fullfilled(data){
				console.log("fullfilled: ",data);
			}, function rejected(data){
				console.log("rejected: ",data);
			});
			
			return;
		}

		if($scope.importance == null){
			var message = "You gave your opinion, but you didn’t say how important this is to you.  Let your politician know if they should fight hard for this or if it’s ok to use it as a bargaining chip for something you really care about.";

			var modal = ngDialog.openConfirm({
		    	template:'<p>'+message+'</p>\
			            <div class="ngdialog-buttons">\
		                	<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">OK</button>\
			            </div>',
			    plain: true
			});
			
			modal.then(function fullfilled(data){
				console.log("fullfilled: ",data);
			}, function rejected(data){
				console.log("rejected: ",data);
			});

			return;
		}

		/*
		var modal = ngDialog.openConfirm({
		    template:'<p>Are you sure you want to close the parent dialog?</p>\
		              <div class="ngdialog-buttons">\
	                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
	                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
		               </div>',
		    plain: true
		});
		console.log("modal: ",modal);
		modal.then(function fullfilled(data){
			console.log("fullfilled: ",data);
		}, function rejected(data){
			console.log("rejected: ",data);
		});
		*/
		var postData = {
			questionId: $scope.questions[$scope.currentIndex]._id,
			importance: $scope.importance,
			answer: $scope.answer,
			comment: $scope.comment,
			token: token
		};
		$scope.postAnswer(postData);
	};

	$scope.skipQuestion = function(){
		var skip = function(){
			var tempIndex = $scope.currentIndex+1;
			if(tempIndex < $scope.questions.length){
				$scope.initializeVariables();
				$scope.currentIndex++;
			}
		};

		if($scope.answer != null){
			var message = 'You just hit the SKIP button.  Are you sure you want to skip this one, or would you rather Submit your answer?';
			var modal = ngDialog.openConfirm({
		    	template:'<p>'+message+'</p>\
			            <div class="ngdialog-buttons">\
		                <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">Yes</button>\
	                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Submit</button>\
			            </div>',
			    plain: true
			});
			
			modal.then(function fullfilled(data){
				//submit answer
				$scope.submitAnswer();
			}, function rejected(data){
				//skip the answer
				skip();
			});
		}
		else{
			skip();
		}
	};

	$scope.prevQuestion = function(){
		if($scope.currentIndex > 0){
			$scope.currentIndex--;
		}
	};

	$scope.reportQuestion = function(){
		console.log("Report questions");
	};
}]);
