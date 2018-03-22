angular
    .module('house')
    .config(routing);

routing.$inject = ['$stateProvider', '$urlRouterProvider'];
function routing(stateProvider, urlRouterProvider) {
    var index = {
        name: 'index',
        url: '/',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/house/index/index.view.html',
                controller: 'indexController',
                controllerAs: 'index'
            }
        },
        resolve: {
            houses: getHouses
        }
    }

    var signup = {
        name: 'signup',
        url: '/signup',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/user/signup/signup.view.html',
                controller: 'signupController',
                controllerAs: 'signup'
            }
        }
    }

    var login = {
        name: 'login',
        url: '/login',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/user/login/login.view.html',
                controller: 'loginController',
                controllerAs: 'login'
            }
        }
    }
    var redirect = {
        name: 'redirect',
        url: '/redirect',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/user/redirect/redirect.view.html',
                controller: 'redirectController',
                controllerAs: 'redirect'
            }
        }
    }

    var profile = {
        name: 'profile',
        url: '/profile',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/user/profile/profile.view.html',
                controller: 'profileController',
                controllerAs: 'profile'
            }
        },
        resolve: {
            checkSession: checkSession,
            houses: getHouses
        }
    }

    var createHouse = {
        name: 'createHouse',
        url: '/houses/create',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/house/create/create.house.view.html',
                controller: 'createHouseController',
                controllerAs: 'createHouse'
            }
        },
        resolve: {
            currencies: getCurrencies,
            houseTypes: getHouseTypes
        }
    }

    var search = {
        name: 'search',
        url: '/houses/search',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/house/search/search.house.view.html',
                controller: 'searchHouseController',
                controllerAs: 'searchHouse'
            }
        },
        resolve: {
            houseTypes: getHouseTypes,
            currencies: getCurrencies
        }
    }

    stateProvider.state(index);
    stateProvider.state(signup);
    stateProvider.state(login);
    stateProvider.state(redirect);
    stateProvider.state(profile);
    stateProvider.state(createHouse);
    stateProvider.state(search);

    urlRouterProvider.otherwise('/login');
};

checkSession.$inject = ['$q', 'appService', 'userService']
function checkSession(q, appService, userService) {
    if (!userService.getLocalUser()) {
        appService.moveTo();
        return;
    }
}

// resolve houses
getHouses.$inject = ['houseService']
function getHouses(houseService) {
    var params = {
        limit: 9
    };
    return houseService.getHouses(params).then(getHousesHandler);

    function getHousesHandler(response) {
        return response.data;
    }
}

// resolve currencies
getCurrencies.$inject = ['currencyService']
function getCurrencies(currencyService) {
    return currencyService.getCurrencies().then(getCurrenciesHandler);

    function getCurrenciesHandler(response) {
        return response.data;
    }
}

// resolve house types
getHouseTypes.$inject = ['houseTypeService']
function getHouseTypes(houseTypeService) {
    return houseTypeService.getHouseTypes().then(getHouseTypesHandler);

    function getHouseTypesHandler(response) {
        return response.data;
    }
}