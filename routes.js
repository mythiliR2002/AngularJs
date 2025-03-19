(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Welcome to Our Restaurant</h1><button ui-sref="categories">See Menu Categories</button>'
            })
            .state('categories', {
                url: '/categories',
                template: '<categories categories="$resolve.categories"></categories>',
                controller: CategoriesController,
                controllerAs: '$ctrl',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/:categoryShortName',
                template: '<items items="$resolve.items"></items>',
                controller: ItemsController,
                controllerAs: '$ctrl',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }

    function CategoriesController() {
        var $ctrl = this;
    }

    function ItemsController() {
        var $ctrl = this;
    }
})();
