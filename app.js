(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        
        toBuy.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        
        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "soda", quantity: 2 },
            { name: "milk", quantity: 1 },
            { name: "bread", quantity: 3 }
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };

        service.buyItem = function(itemIndex) {
            var item = toBuyItems[itemIndex];
            toBuyItems.splice(itemIndex, 1);
            alreadyBoughtItems.push(item);
        };
    }
})();
