(function () {
  'use strict';

  angular.module('restaurantApp', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/sign-up', {
          templateUrl: 'sign-up.html',
          controller: 'SignUpController'
        })
        .when('/my-info', {
          templateUrl: 'my-info.html',
          controller: 'MyInfoController'
        })
        .otherwise({
          redirectTo: '/sign-up'
        });
    })
    .service('userInfoService', function($http) {
      var userInfo = {};

      this.saveUserInfo = function(user) {
        userInfo = user;
      };

      this.getUserInfo = function() {
        return userInfo;
      };

      this.checkMenuItem = function(menuNumber) {
        return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json')
          .then(function(response) {
            var menuItems = response.data;
            for (var category in menuItems) {
              for (var item in menuItems[category].menu_items) {
                if (menuItems[category].menu_items[item].short_name === menuNumber) {
                  return menuItems[category].menu_items[item];
                }
              }
            }
            return null;
          });
      };
    })
    .controller('SignUpController', function($scope, userInfoService) {
      $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        favoriteMenuNumber: ''
      };

      $scope.favoriteMenuItem = null;
      $scope.formSubmitted = false;
      $scope.errorMessage = '';

      $scope.submitForm = function() {
        if ($scope.signUpForm.$valid) {
          userInfoService.checkMenuItem($scope.user.favoriteMenuNumber)
            .then(function(response) {
              if (response) {
                userInfoService.saveUserInfo($scope.user);
                $scope.formSubmitted = true;
                $scope.successMessage = 'Your information has been saved.';
              } else {
                $scope.errorMessage = 'No such menu number exists.';
                $scope.favoriteMenuItem = null;
              }
            });
        }
      };

      $scope.validateFavoriteMenuItem = function() {
        if ($scope.user.favoriteMenuNumber) {
          userInfoService.checkMenuItem($scope.user.favoriteMenuNumber)
            .then(function(response) {
              $scope.favoriteMenuItem = response;
              if (!response) {
                $scope.errorMessage = 'No such menu number exists.';
              } else {
                $scope.errorMessage = '';
              }
            });
        }
      };
    })
    .controller('MyInfoController', function($scope, userInfoService) {
      $scope.user = userInfoService.getUserInfo();
      if (!$scope.user.firstName) {
        $scope.message = 'Not Signed Up Yet. <a href="#/sign-up">Sign up Now!</a>';
      } else {
        $scope.message = 'Welcome, ' + $scope.user.firstName + ' ' + $scope.user.lastName;
        $scope.favoriteMenuItem = null;
        if ($scope.user.favoriteMenuNumber) {
          userInfoService.checkMenuItem($scope.user.favoriteMenuNumber)
            .then(function(response) {
              if (response) {
                $scope.favoriteMenuItem = response;
              }
            });
        }
      }
    });
})();
