(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  // Controller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchTerm = "";
    ctrl.found = [];

    // Function to narrow down menu items
    ctrl.narrowDown = function() {
      if (ctrl.searchTerm.trim() === "") {
        ctrl.found = [];
        return;
      }
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
        .then(function(result) {
          ctrl.found = result;
        });
    };

    // Function to remove unwanted item
    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    };
  }

  // Service to get matched menu items from the server
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function(response) {
        var foundItems = [];
        var menuItems = response.data;

        // Loop through menu items and check if description matches
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundItems.push(menuItems[i]);
          }
        }
        return foundItems;
      });
    };
  }

  // Directive for displaying found items
  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'found-items.html',
      scope: {
        found: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }
})();
