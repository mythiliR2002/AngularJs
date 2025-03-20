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

      // Randomly created menu items from L1 to L10
      const menuItems = {
        "L1": { name: "Spicy Chicken", category: "Chicken", description: "A flavorful spicy chicken dish.", image: "https://via.placeholder.com/100?text=Chicken" },
        "L2": { name: "Mutton Curry", category: "Mutton", description: "A rich and tender mutton curry.", image: "https://via.placeholder.com/100?text=Mutton" },
        "L3": { name: "Egg Bhurji", category: "Egg", description: "Scrambled eggs with spices.", image: "https://via.placeholder.com/100?text=Egg" },
        "L4": { name: "Grilled Chicken", category: "Chicken", description: "Tender grilled chicken with herbs.", image: "https://via.placeholder.com/100?text=Grilled+Chicken" },
        "L5": { name: "Mutton Biryani", category: "Mutton", description: "Fragrant biryani with succulent mutton.", image: "https://via.placeholder.com/100?text=Mutton+Biryani" },
        "L6": { name: "Omelette", category: "Egg", description: "Fluffy and delicious omelette.", image: "https://via.placeholder.com/100?text=Omelette" },
        "L7": { name: "BBQ Chicken", category: "Chicken", description: "Smoky BBQ chicken wings.", image: "https://via.placeholder.com/100?text=BBQ+Chicken" },
        "L8": { name: "Mutton Kebab", category: "Mutton", description: "Succulent mutton kebabs.", image: "https://via.placeholder.com/100?text=Mutton+Kebab" },
        "L9": { name: "Egg Fried Rice", category: "Egg", description: "Stir-fried rice with eggs.", image: "https://via.placeholder.com/100?text=Egg+Fried+Rice" },
        "L10": { name: "Chicken Tikka", category: "Chicken", description: "Tender chicken pieces marinated in spices.", image: "https://via.placeholder.com/100?text=Chicken+Tikka" }
      };

      this.saveUserInfo = function(user) {
        userInfo = user;
      };

      this.getUserInfo = function() {
        return userInfo;
      };

      this.checkMenuItem = function(menuNumber) {
        return menuItems[menuNumber] || null;
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
          var menuItem = userInfoService.checkMenuItem($scope.user.favoriteMenuNumber);
          if (menuItem) {
            userInfoService.saveUserInfo($scope.user);
            $scope.formSubmitted = true;
            $scope.successMessage = 'Your information has been saved.';
          } else {
            $scope.errorMessage = 'No such menu number exists.';
            $scope.favoriteMenuItem = null;
          }
        }
      };

      $scope.validateFavoriteMenuItem = function() {
        if ($scope.user.favoriteMenuNumber) {
          var menuItem = userInfoService.checkMenuItem($scope.user.favoriteMenuNumber);
          $scope.favoriteMenuItem = menuItem;
          if (!menuItem) {
            $scope.errorMessage = 'No such menu number exists.';
          } else {
            $scope.errorMessage = '';
          }
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
          var menuItem = userInfoService.checkMenuItem($scope.user.favoriteMenuNumber);
          if (menuItem) {
            $scope.favoriteMenuItem = menuItem;
          }
        }
      }
    });
})();
