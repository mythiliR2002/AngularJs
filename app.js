(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    // Protect the code from minification by injecting $scope
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        var lunch = this;
        lunch.items = "";
        lunch.message = "";
        lunch.messageStyle = {};

        // Function to check the number of lunch items
        lunch.checkLunch = function() {
            if (lunch.items === "" || lunch.items.trim() === "") {
                lunch.message = "Please enter data first";
                lunch.messageStyle = { "color": "red" };
            } else {
                var itemList = lunch.items.split(",");
                var itemCount = itemList.filter(function(item) {
                    return item.trim() !== "";  // Remove empty items
                }).length;

                if (itemCount <= 3) {
                    lunch.message = "Enjoy!";
                    lunch.messageStyle = { "color": "green" };
                } else {
                    lunch.message = "Too much!";
                    lunch.messageStyle = { "color": "green" };
                }
            }
        };
    }
})();
