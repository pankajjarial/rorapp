var myApp = angular.module('myapplication', ['ngRoute', 'ngResource']); 


//Controller
myApp.controller("UserListCtr", function($scope, $http, $location) {
    $http.get("/users.json").success(function(response) {$scope.users = response;});
    $scope.deleteUser = function (userId) {
        if (confirm("Are you sure you want to delete this user?")){
            $http.delete("/users/"+userId+".json").success(function(response) {$location.path('/');});
        }
    };
});

myApp.controller("UserUpdateCtr", function($scope, $http, $location, $routeParams) {
  $scope.user = {};
  var userId = $routeParams.id;
  $http.get("/users/"+userId+".json").success(function(response) {$scope.user = response;});
  $scope.update = function(){
    if ($scope.userForm.$valid){
        $http.put("/users/"+userId,$scope.user).success(function(response) {$location.path('/');});
    }
  };
});

myApp.controller("UserAddCtr", function($scope,  $http, $location) {
    $scope.user = {};
    $scope.save = function () {
        if ($scope.userForm.$valid){
            $http.post("/users",$scope.user).success(function(response) {$location.path('/');});
        }
    }
});



//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/users',{
      templateUrl: '/templates/users/index.html',
      controller: 'UserListCtr'
    });
    $routeProvider.when('/users/new', {
      templateUrl: '/templates/users/new.html',
      controller: 'UserAddCtr'
    });
    $routeProvider.when('/users/:id/edit', {
      templateUrl: '/templates/users/edit.html',
      controller: "UserUpdateCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/users'
    });
  }
]);

