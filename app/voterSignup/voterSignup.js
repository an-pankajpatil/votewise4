'use strict';
angular.module('myApp.voterSignup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/votersignup', {
    templateUrl: 'voterSignup/voterSignup.html',
    controller: 'voterSignupCtrl'
  });
}])

.controller('voterSignupCtrl', ['$scope','$http','$location','apiCall', function ($scope, $http, $location, apiCall) {
  $scope.user = {};
  $scope.usernameMessage = '';
  $scope.passwordMessage = '';
  $scope.emailMessage = '';
  $scope.taken = true;
  $scope.county = '';
  $scope.cities = [];
  $scope.zipClicked = "zip-not-clicked";
  const validate = apiCall.constants();

  $scope.makeErrorList = (response) => {
    console.log(response.errors);
    var errors = [];
    for (var key in response.errors) {
      if (response.errors.hasOwnProperty(key)) {
        var value = response.errors[key];
        if (value.message !== undefined) {
          errors.push(value.message);
        }
    }
    return errors;
  }
}

function validateUsername (username) {
  $scope.usernameMessage = '';
  const validated = validate.regex.username.test(username);
  if (!validated && username.length > 25 ) {
    $scope.usernameMessage = 'cannot be longer than 25 charectors and can contain (. - _ $ @ * ! )';
    return false;
  }
  if (!validated && username.length < 3 ) {
    $scope.usernameMessage = 'cannot be shorter than 3 charectors and can contain (. - _ $ @ * !)';
    return false;
  }
  if (!validated) {
    $scope.usernameMessage = 'must be between 3 and 25 charectors and can contain (. - _ $ @ * !)';
    return false;
  }
  if (validated) {
    usernameTaken(username);
      if ($scope.taken) {
        return true;
      }
      return false;
  }
  return validated;
}

function validatePassword (password) {
  $scope.passwordMessage = '';
  const validated = validate.regex.password.test(password);
  if (!validated) {
    $scope.passwordMessage = ' must be at least 8 charectors long, contain one number, one uppercase letter and one lowercase letter';
    return false;
  }
  return validated;
}

function validateEmail (email) {
  $scope.emailMessage = '';
  const validated = validate.regex.email.test(email);
  if (!validated) {
    $scope.emailMessage = 'Not a valid email address';
    return false;
  }
  if (validated) {
    emailTaken(email);
      if($scope.taken) {
        return true;
      }
      return false;
  }
  return validated;
}

function validateInputs (username, email, password) {
  const validUsername = validateUsername(username);
  const validEmail = apiCall.validateEmail(email, $scope);
  const validPassword = validatePassword(password);
  if (validUsername && validEmail && validPassword) {
    return true;
  }
  return false;
}

function usernameTaken(username) {
  const request = apiCall.apiCall('GET', '/check/username/' + username, undefined);
  $http(
    request
  ).then(function successCallback(response) {
    if (response.data.taken) {
        $scope.usernameMessage = ' is taken';
        $scope.taken = false;
        return;
    }
    $scope.taken = true;
  }, function errorCallBack(response) {
    console.log(response);
  });
}

const emailTaken = (email) => {
  const request = apiCall.apiCall('GET', '/check/email/' + email, undefined);
  $http(
    request
  ).then(function successCallback(response) {
    if (response.data.taken) {
        $scope.emailMessage = ' is taken';
        $scope.taken = false;
        return;
    }
    $scope.taken = true;
  }, function errorCallBack(response) {
    console.log(response);
  });
}

$scope.findByZip = ( user ) => {
  const request = apiCall.apiCall('GET', '/ziplookup/zip/'+ user.zip, undefined);
  $http(
    request
  ).then(function success(response) {
    console.log(response.data.zip);
    $scope.county = response.data.zip.county;
    $scope.cities = response.data.zip.city;
    $scope.zipClicked = 'zip-clicked';
  }, function error(response) {
    console.log(response.data);
  })
}

  $scope.signUp = ( user )=> {
    $scope.errorMessages = '';
    console.log(user);
    user.county = $scope.county;
    const validated = validateInputs (user.username, user.email, user.password);
    usernameTaken(user.username);
    if (user.username && user.password && user.zip && user.email && validated) {
      const data = {
           password: user.password,
           city: user.city,
           street: user.address,
           zip: user.zip,
           username: user.username,
           email: user.email
      };
      const request = apiCall.apiCall('POST', '/user/signup', data);
     $http(
       request
     ).then(function successCallback(response) {
      $location.path('/welcomeView');
    }, function errorCallback(response) {
       var errorList = $scope.makeErrorList(response.data.error);
       if (errorList) {
         $scope.errorMessages = String(errorList);
       }
       else {
          $scope.errorMessages = '';
       }

    });
  }
  else {
    $scope.errorMessages = 'Please fill out all fields.';
  }
 }

}]);
