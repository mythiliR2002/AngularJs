(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.foundItems = [];

    ctrl.narrowDown = function () {
      if (!ctrl.searchTerm) {
        ctrl.foundItems = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
        .then(function (result) {
          ctrl.foundItems = result;
        })
        .catch(function (error) {
          console.error('Error while fetching menu items:', error);
        });
    };

    ctrl.removeItem = function (index) {
      ctrl.foundItems.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (response) {
        var allItems = response.data;
        var foundItems = [];

        for (var key in allItems) {
          if (allItems[key].description && allItems[key].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(allItems[key]);
          }
        }

        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'found-items.template.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundCtrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundCtrl = this;
  }
})();
