(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'categories.component.html',
            bindings: {
                categories: '<'
            }
        });
})();
