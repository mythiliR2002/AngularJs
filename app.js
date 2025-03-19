(function() {
    // Define the AngularJS app and its dependencies
    angular.module('MenuApp', ['ui.router'])
        .config(RoutesConfig)
        .service('MenuDataService', MenuDataService)
        .component('categories', {
            templateUrl: 'categories.component.html',
            bindings: {
                categories: '<'
            }
        })
        .component('items', {
            templateUrl: 'items.component.html',
            bindings: {
                items: '<'
            }
        });

    // Routing configuration
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            template: '<h1>Welcome to our Restaurant!</h1><a ui-sref="categories" class="btn">View Categories</a>'
        })
        .state('categories', {
            url: '/categories',
            template: '<categories categories="$ctrl.categories"></categories>',
            controller: CategoriesController,
            controllerAs: '$ctrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            template: '<items items="$ctrl.items"></items>',
            controller: ItemsController,
            controllerAs: '$ctrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }

    // Categories Controller
    CategoriesController.$inject = ['categories'];
    function CategoriesController(categories) {
        var $ctrl = this;
        $ctrl.categories = categories;
    }

    // Items Controller
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        var $ctrl = this;
        $ctrl.items = items;
    }

    // MenuDataService to fetch data from the API
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function() {
            return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
                .then(function(response) {
                    return response.data;
                });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json')
                .then(function(response) {
                    return response.data;
                });
        };
    }
})();
