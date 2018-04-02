angular
    .module('house')
    .config(routing);

routing.$inject = ['$stateProvider', '$urlRouterProvider'];
function routing(stateProvider, urlRouterProvider) {
    let index = {
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
            user: getUser,
            message: getMessage
        }
    }

    let signup = {
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
            user: getUser,
            regions: getRegions
        }
    }

    let createAdmin = {
        name: 'createAdmin',
        url: '/admin/create',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/user/admin/create/create.admin.view.html',
                controller: 'createAdminController',
                controllerAs: 'createAdmin'
            }
        },
        resolve: {
            regions: getRegions,
            user: getUser
        }
    }

    let login = {
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
    let redirect = {
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
        },
        resolve: {
            user: getUser
        }
    }

    let profile = {
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
            regions: getRegions,
            houses: getHouses,
            user: getUser
        }
    }

    let createHouse = {
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
            regions: getRegions,
            currencies: getCurrencies,
            houseTypes: getHouseTypes,
            user: getUser
        }
    }

    let editHouse = {
        name: 'editHouse',
        url: '/houses/:house_id/edit',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/house/edit/edit.house.view.html',
                controller: 'editHouseController',
                controllerAs: 'editHouse'
            }
        },
        resolve: {
            user: getUser,
            regions: getRegions,
            house: getHouseById,
            currencies: getCurrencies,
            houseTypes: getHouseTypes
        }
    }

    let search = {
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
            regions: getRegions,
            houseTypes: getHouseTypes,
            currencies: getCurrencies,
            user: getUser
        }
    }

    let testGenerator = {
        name: 'test',
        url: '/test/generator',
        views: {
            navbar: {
                templateUrl: 'javascripts/angular/navbar/navbar.view.html',
                controller: 'navbarController',
                controllerAs: 'navbar'
            },
            content: {
                templateUrl: 'javascripts/angular/test/test.generator.view.html',
                controller: 'testController',
                controllerAs: 'test'
            }
        },
        resolve: {
            addresses: getAddresses,
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
    stateProvider.state(createAdmin);
    stateProvider.state(editHouse);
    stateProvider.state(search);
    stateProvider.state(testGenerator);

    urlRouterProvider.otherwise('/login');
};

/**
 * get message
 * @param {*} appService app service
 */
function getMessage(appService) {
    let message = appService.getMessage();
    appService.deleteMessage();
    return message;
}
getMessage.$inject = ['appService'];

/**
 * get addresses
 * @param {*} addressService address service
 */
function getAddresses(addressService) {
    return addressService.getAddresses().then(getAddressesHandler);

    function getAddressesHandler(response) {
        return response.data;
    }
}
getAddresses.$inject = ['addressService'];

/**
 * get regions
 * @param {*} addressService address service
 */
function getRegions(addressService) {
    return addressService.getRegions().then(getRegionsHandler);

    function getRegionsHandler(response) {
        return response.data;
    }
}
getAddresses.$inject = ['addressService'];

/**
 * get bookmarks
 * @param {*} bookmarkService address service
 */
function getBookmarks(addressService) {
    return bookmarkService.getBookmarks().then(bookmarkServiceHander);

    function bookmarkServiceHander(response) {
        return response.data;
    }
}
getBookmarks.$inject = ['bookmarkService'];

/**
 * get houses
 * @param {*} houseService house service
 */
function getHouses(houseService) {
    let params = {
        count: 9
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
 * get house id from state params
 * @param {*} stateParams state params
 */
function getHouseById(houseService, stateParams) {
    return houseService.getHouseById(stateParams.house_id).then(getHouseByIdHandler);

    function getHouseByIdHandler(response) {
        return response.data;
    }
}
getHouseById.$inject = ['houseService', '$stateParams'];


/**
 * resolve user
 * @param {*} userService user service
 */
function getUser(userService) {
    let user = userService.getLocalUser();
    if (!user) {
        return null;
    }
    return userService.getUser(user.id).then(getUserHandler);

    function getUserHandler(response) {
        if (response.status == 401) {
            userService.deleteLocalUser();
            return null;
        }
        return response.data;
    }
}
getUser.$inject = ['userService'];