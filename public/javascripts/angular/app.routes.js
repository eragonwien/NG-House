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
            houses: getHouses,
            user: getUser
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
        },
        resolve: {
            user: getUser
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
        },
        resolve: {
            user: getUser
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
            houses: getHouses,
            user: getUser
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
            houseTypes: getHouseTypes,
            user: getUser
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
            currencies: getCurrencies,
            user: getUser
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

/**
 * get houses
 * @param {*} houseService house service
 */
function getHouses(houseService) {
    var params = {
        limit: 9
    };
    return houseService.getHouses(params).then(getHousesHandler);

    function getHousesHandler(response) {
        return response.data;
    }
}
getHouses.$inject = ['houseService'];

/**
 * get currencies
 * @param {*} currencyService currency service
 */
function getCurrencies(currencyService) {
    return currencyService.getCurrencies().then(getCurrenciesHandler);

    function getCurrenciesHandler(response) {
        return response.data;
    }
}
getCurrencies.$inject = ['currencyService'];

/**
 * get house types
 * @param {*} houseTypeService house type service
 */
function getHouseTypes(houseTypeService) {
    return houseTypeService.getHouseTypes().then(getHouseTypesHandler);

    function getHouseTypesHandler(response) {
        return response.data;
    }
}
getHouseTypes.$inject = ['houseTypeService'];

/**
 * resolve user
 * @param {*} userService user service
 */
function getUser(userService) {
    var user = userService.getLocalUser();
    if (!user) {
        return null;
    }
    return userService.getUser(user.id).then(getUserHandler);

    function getUserHandler(response) {
        if (!response) {
            return null;
        }
        return response.data;
    }
}
getUser.$inject = ['userService'];