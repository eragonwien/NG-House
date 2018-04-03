let app = angular.module('house', ['ui.router']);

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
    };

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
    };

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
    };

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
    };
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
    };

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
    };

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
    };

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
    };

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
    };

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
    };

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
}

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
$(document).ready(function () {
    
});
angular
    .module('house')
    .filter('houseFilter', houseFilter);

function houseFilter() {

    /**
     * filter out all houses which belong to the user
     * @param {object[]} houses list of houses
     * @param {object} user user object
     */
    function filter(houses, user) {
        let result = [];
        houses.forEach(function (house) {
            if (!user || user.id != house.user_id) {
                result.push(house);
            }
        });
        return result;
    }

    return filter;
}
angular
    .module('house')
    .controller('navbarController', navbarController);

navbarController.$inject = ['user', 'userService', 'appService']
function navbarController(user, userService, appService) {
    let vm = this;
    vm.user = user;
    vm.reload = reload;
    vm.logout = logout;
    initSideNav();

    function reload() {
        appService.reload();
    }

    function logout() {
        userService.logout().then(logoutHandler);

        function logoutHandler(response) {
            if (response.status == 200) {
                userService.deleteLocalUser();
                appService.alert('Successfully logged out');
            } else {
                appService.alert('Error on logging out');
            }
            appService.moveTo('redirect');
        }
    }

    function initSideNav() {
        let elem = document.querySelector('.sidenav');
        let options = {};
        let instance = M.Sidenav.init(elem, options);
    }
}
angular
    .module('house')
    .factory('addressService', addressService);

addressService.$inject = ['$http'];
function addressService(http) {
    let service = {
        getAddresses: getAddresses,
        getRegions: getRegions
    };
    return service;
    
    /**
     * get all addresses per http
     * 
     * @returns response
     */
    function getAddresses() {
        return http({
            method: 'GET',
            url: '/api/addresses'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }

    function getRegions() {
        return http({
            method: 'GET',
            url: '/api/postalCodes'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }
}
angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state', '$window', '$http']
function appService(state, window, http) {
    let service = {
        alert: alert,
        moveTo: moveTo,
        reload: reload,
        getMessage: getMessage,
        setMessage: setMessage,
        deleteMessage: deleteMessage,
        getErrorMessage: getErrorMessage,
        sendMail: sendMail,
        initRegionAutocomplete: initRegionAutocomplete,
        getUserPostalCode: getUserPostalCode
    };
    return service;

    /**
     * show a short message 
     * 
     * @param {string} message text message
     * @param {number} duration duration of the message in ms
     */
    function alert(message, duration) {
        duration = (duration) ? duration: 5000;
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        M.toast({
            html: message
        });
    }

    /**
     * change url to the given path
     * @param {?string} path path name
     */
    function moveTo(path) {
        if (!path) {
            path = 'index';
        }
        state.go(path);
    }

    /**
     * reload the current page
     */
    function reload() {
        window.location.reload();
    }

    /**
     * get the local stored message
     */
    function getMessage() {
        return window.localStorage.getItem('message');
    }

    /**
     * create or replace the local stored message
     * @param {string} message text message
     */
    function setMessage(message) {
        window.localStorage.setItem('message', message);
    }

    /**
     * delete the content of the local stored message
     */
    function deleteMessage() {
        window.localStorage.removeItem('message');
    }

    /**
     * send an email by passing information per post on server
     * @param {object} params parameter contains sender and receiver information
     */
    function sendMail(params) {
        return http({
            method: 'POST',
            url: '/mailer',
            data: params
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    /**
     * interprets error object
     * @param {object} error error object
     */
    function getErrorMessage(error) {
        return error;
    }

    function initRegionAutocomplete(regions) {
        let results = filterRegions(regions);
        let elem = document.querySelector('.autocomplete');
        let options = {
            data: results
        };
        let instance = M.Autocomplete.init(elem, options);


        function filterRegions(regions) {
            let results = {};
            for (let i = 0; i < regions.length; i++) {
                let region = regions[i];
                let key =  region.postal_code_code + ', ' + region.city_name + ', ' + region.land_name;
                results[key] = null;
            }
            return results;
        }
    }

    function getUserPostalCode(address, regions) {
        let postal_code_id = getRegionIdByAddress(regions, getAddress(address));
        return postal_code_id;
        /**
         * compares and returns the postal code id of the address   
         * @param {object} address address with code, city and land properties
         * @return {number} postal code id
         */
        function getRegionIdByAddress(regions, address) {
            for (let i = 0; i < regions.length; i++) {
                let region = regions[i];
                if (region.postal_code_code === address.postal_code_code && region.city_name === address.city_name && region.land_name === address.land_name) {
                    return region.id;
                }
            }
        }

        /**
         * converts string into address
         * @param {string} address addres string
         * @return {object} address with code, city and land names
         */
        function getAddress(address) {
            let result = {
                postal_code_code: null,
                city_name: null,
                land_name: null
            };
            let str = address.split(', ');
            result.postal_code_code = str[0];
            result.city_name = str[1];
            result.land_name = str[2];
            return result;
        }
    }
}
angular
    .module('house')
    .factory('bookmarkService', bookmarkService);

bookmarkService.$inject = ['$http']
function bookmarkService(http) {
    let service = {
        getBookmarksByUser: getBookmarksByUser,
        createBookmark: createBookmark,
        deleteBookmarkById: deleteBookmarkById
    }
    return service;

    function getBookmarksByUser(user_id) {
        return http({
            method: 'GET',
            url: '/api/users/' + user_id + '/bookmarks'
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function createBookmark(bookmark) {
        return http({
            method: 'POST',
            url: '/api/bookmarks',
            data: bookmark
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function deleteBookmarkById(id) {
        return http({
            method: 'DELETE',
            url: '/api/bookmarks/' + id
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}
angular
    .module('house')
    .factory('currencyService', currencyService);

currencyService.$inject = ['$http', '$q'];
function currencyService(http, q) {
    let service = {
        getCurrencies: getCurrencies
    }
    return service;

    function getCurrencies() {
        return http({
            method: 'GET',
            url: '/api/currencies'
        }).then(getCurrenciesSuccess, getCurrenciesError);

        function getCurrenciesSuccess(response) {
            return response;
        }

        function getCurrenciesError(response) {
            return response;
        }
    }
}
angular
    .module('house')
    .factory('houseService', houseService);

houseService.$inject = ['$http']
function houseService(http) {
    let service = {
        getHouses: getHouses,
        getHouseById: getHouseById,
        addHouse: addHouse,
        updateHouse: updateHouse,
        deleteHouse: deleteHouse        
    }
    return service;

    function getHouses(params) {
        return http({
            method: 'GET',
            url: '/api/houses',
            params: params
        }).then(getHousesSuccess, getHousesError);

        function getHousesSuccess(response) {
            return response;
        }

        function getHousesError(response) {
            return response;
        }
    }

    function getHouseById(id) {
        return http({
            method: 'GET',
            url: '/api/houses/' + id
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function addHouse(house) {
        return http({
            method: 'POST',
            url: '/api/houses',
            data: house
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function deleteHouse(house) {
        return http({
            method: 'DELETE',
            url: '/api/houses/' + house.id
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function updateHouse(house) {
        return http({
            method: 'PUT',
            url: '/api/houses/' + house.id,
            data: house
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}
angular
    .module('house')
    .factory('houseTypeService', houseTypeService);

houseTypeService.$inject = ['$http'];
function houseTypeService(http) {
    let service = {
        getHouseTypes: getHouseTypes
    }
    return service;

    function getHouseTypes() {
        return http({
            method: 'GET',
            url: '/api/houseTypes'
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}
angular
    .module('house')
    .factory('testService', testService);

testService.$inject = ['$http']
function testService(http) {
    let service = {
        sendTest: sendTest,
        getRandomUsers: getRandomUsers
    }
    return service;

    function sendTest(test) {
        return http({
            method: 'POST',
            url: '/test',
            data: test
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return error;
        }
    }

    function getRandomUsers(count) {
        return http({
            method: 'GET',
            url: 'https://randomname.de/?format=json&count=' + count
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return error;
        }
    }
}
angular
    .module('house')
    .factory('userService', userService);

userService.$inject = ['$window', '$http'];
function userService(window, http) {
    let service = {
        getLocalUser: getLocalUser,
        setLocalUser: setLocalUser,
        deleteLocalUser: deleteLocalUser,
        login: login,
        signup: signup,
        update: update,
        logout: logout,
        getUser: getUser
    }
    return service;

    function getLocalUser() {
        let local = window.localStorage.getItem('user');
        let session = window.sessionStorage.getItem('user');
        let result = (session) ? session : local;
        return JSON.parse(result);
    }

    function setLocalUser(user, remember) {
        if (remember) {
            window.localStorage.setItem('user', JSON.stringify(user));
            return;
        }
        window.sessionStorage.setItem('user', JSON.stringify(user));
    }

    function deleteLocalUser() {
        window.localStorage.removeItem('user');
        window.sessionStorage.removeItem('user');
    }

    function login(username, password) {
        return http({
            method: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        }).then(loginSuccess, loginError);

        function loginSuccess(response) {
            return response;
        }

        function loginError(response) {
            return response;
        }
    }
    
    /**
     * create a new user per http request
     * 
     * @param {object} user object user
     * @returns {object} response
     */
    function signup(user) {
        return http({
            method: 'POST',
            url: '/api/users',
            data: user
        }).then(signupSuccess, signupError);

        function signupSuccess(response) {
            return response;
        }

        function signupError(response) {
            return response;
        }
    }

    function update(user) {
        return http({
            method: 'PUT',
            url: '/api/users/' + user.id,
            data: user
        }).then(updateSuccess, updateError);

        function updateSuccess(response) {
            return response;
        }

        function updateError(response) {
            return response;
        }
    }

    function logout() {        
        return http({
            method: 'GET',
            url: '/logout'
        }).then(logoutSuccess, logoutError);

        function logoutSuccess(response) {
            return response;
        }

        function logoutError(response) {            
            return response;
        }
    }

    function getUser(user_id) {
        // check if the session is still valid
        return http({
            method: 'GET',
            url: 'api/users/' + user_id
        }).then(getUserSuccess, getUserError);

        function getUserSuccess(response) {
            return response;
        }

        function getUserError(response) {
            return response;
        }
    }
}
angular
    .module('house')
    .controller('testController', testController);

testController.$inject = ['appService', 'testService']
function testController(appService, testService) {
    let vm = this;

    vm.generate = generate;
    vm.loading = false;

    function generate(test) {
        if (!test.type) {
            appService.alert('Test type is required');
            return;
        }
        if (!test.count || test.count < 0) {
            appService.alert('Test type cannot be negative');
            return;
        }
        testService.sendTest(test).then(sendTestHandler);
        vm.loading = true;

        function sendTestHandler(response) {
            vm.loading = false;
            if (response.status == 200) {
                if (response.data.errors) {
                    response.data.errors.forEach(error => {
                        console.error(error);
                    });
                }
                return appService.alert(response.data.count + ' ' + test.type + 's created.');
            }
            appService.alert(response.status + ': ' + response.statusText);
        }
    }
}
angular
    .module('house')
    .controller('createHouseController', createHouseController);

createHouseController.$inject = ['user', 'currencies', 'houseTypes', 'regions', 'houseService', 'currencyService', 'userService', 'houseTypeService', 'appService']
function createHouseController(user, currencies, houseTypes, regions, houseService, currencyService, userService, houseTypeService, appService) {
    let vm = this;
    vm.user = user;
    vm.getCurrencies = getCurrencies;
    vm.submit = submit;
    vm.currencies = currencies;
    vm.houseTypes = houseTypes;

    appService.initRegionAutocomplete(regions);

    /* Create House */
    function submit(form) {
        if (!form.$valid) {
            appService.alert('Invalid Form');
            return;
        }
        if (!vm.newHouse.region) {
            appService.alert('Region is required.');
            return;
        }
        vm.newHouse.postal_code_id = appService.getUserPostalCode(vm.newHouse.region, regions);
        houseService.addHouse(vm.newHouse).then(addHouseHandler);

        function addHouseHandler(response) {
            if (response.status == 200) {
                appService.alert('Successfully added.');
                appService.moveTo();
                return;
            }
            appService.alert(response.data);
        }
    }

    /* Currency */
    function getCurrencies() {
        currencyService.getCurrencies().then(getCurrenciesHandler);

        function getCurrenciesHandler(response) {
            if (response.status == 200) {
                vm.currencies = response.data;
                return;
            }
            appService.alert(response.data);
        }
    }

    /* House Type */
    function getHouseTypes() {
        houseTypeService.getHouseTypes().then(getHouseTypesHandler);

        function getHouseTypesHandler(response) {
            if (response.status == 200) {
                vm.houseTypes = response.data;
                return;
            }
            appService.alert(response.data);
        }
    }
}
angular
    .module('house')
    .controller('editHouseController', editHouseController);

editHouseController.$inject = ['user', 'house', 'regions', 'currencies', 'houseTypes', 'houseService', 'appService']
function editHouseController(user, house, regions, currencies, houseTypes, houseService, appService) {
    let vm = this;
    vm.user = user;
    vm.editHouse = house;
    vm.currencies = currencies;
    vm.houseTypes = houseTypes;
    vm.submit = submit;
    vm.cancelEditing = cancelEditing;

    appService.initRegionAutocomplete(regions);

    function getHouseById(id) {
        houseService.getHouseById(id).then(getHouseByIdHandler);
    
        function getHouseByIdHandler(response) {
            if (response.status == 200) {
                vm.house = response.data;
                vm.editHouse = response.data;
                return;
            }
            appService.alert(response.data);
        }   
    }

    function submit(form) {
        if (!form.$valid) {
            appService.alert('INVALID FORM');
            return;
        }
        if (!vm.editHouse.region) {
            appService.alert('Region is required');
            return;
        }
        vm.editHouse.postal_code_id = appService.getUserPostalCode(vm.editHouse.region, regions);
        delete vm.editHouse.address_id;
        houseService.updateHouse(vm.editHouse).then(updateHouseHandler);

        function updateHouseHandler(response) {
            if (response.status == 200) {
                
                appService.alert('updated successfully.');
                appService.moveTo('profile');
                return;
            }
            appService.alert('Error: ' + response.data);      
        }
    }

    function cancelEditing() {
        appService.deleteMessage(); // remove the house id  
        appService.moveTo('redirect');
        appService.alert('Editing canceled');
    }
}
angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['user', 'houses', 'message', 'houseService', 'userService', 'currencyService', 'bookmarkService', 'appService'];
function indexController(user, houses, message, houseService, userService, currencyService, bookmarkService, appService) {
    let vm = this;
    vm.user = user;
    vm.createHouse = createHouse;
    vm.houses = houses;
    vm.contact = contact;
    vm.sendMail = sendMail;
    vm.bookmark = bookmark;
    
    if (message) {
        appService.alert(message);
    }
    if (user) {
        getBookmarksOfHouses();   
    }

    /**
     * change app to create house
     */
    function createHouse() {
        if (!vm.user) {
            appService.alert('Please login first!');
            return;
        }
        appService.moveTo('createHouse');
    }

    /**
     * add the house to focus for email sending
     * @param {object} house house
     */
    function contact(house) {
        vm.agent = {
            username: house.username,
            email: house.email
        };
    }

    /**
     * send email to the receiver
     * @param {object} receiver 
     */
    function sendMail(receiver) {
        if (!vm.agent.message) {
            appService.alert('Empty message cannot be sent.');
            return;
        }
        appService.alert('Sending...');
        let sender = vm.user.email;
        let redirectAddress = 'eragonwien@gmail.com'; // redirect email to dev instead
        let text = getText(sender, receiver, vm.agent.message.content);
        let params = {
            sender: sender,
            receiver: redirectAddress, 
            subject: vm.agent.message.subject,
            text: text
        }
        appService.sendMail(params).then(sendMailHandler);

        function sendMailHandler(response) {
            if (response.status == 200) {
                return appService.alert('Email is sent.');
            }
            appService.alert('Error: ' + response.data);
        }
    }

    /**
     * create a generic email message 
     * @param {string} sender address of sender
     * @param {string} receiver address of receiver
     * @param {string} text content of the email
     */
    function getText(sender, receiver, text) {
        let result = 'Redirect info: \n';
        result += 'From: ' + sender + '\n';
        result += 'To: ' + receiver.email + ' of ' + receiver.username + '\n';
        result += '**********************\n';
        result += text + '\n';
        return result;
    }

    /**
     * add or remove the house from bookmark
     * @param {object} house house
     */
    function bookmark(house) {
        if (house.bookmark) {
            return addBookmark(house);
        }
        removeBookmark(house);
    }

    /**
     * add this house to bookmark
     * @param {object} house house
     */
    function addBookmark(house) {
        let data = {
            user_id: vm.user.id,
            house_id: house.id
        }
        bookmarkService.createBookmark(data).then(createBookmarkHandler);
        house.bookmark = true;

        function createBookmarkHandler(response) {
            if (response.status == 200) {
                return appService.alert('Bookmark added: Nr.' + response.data.insertId);
            }
            appService.alert(response.data, 10000);
        }
    }

    /**
     * remove bookmark of the specific house
     * @param {object} house house
     */
    function removeBookmark(house) {
        bookmarkService.deleteBookmarkById(house.bookmark_id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                house.bookmark = false;
                return appService.alert('Bookmark removed');
            }
            appService.alert(response.data);
        }
    }

    /**
     * get all bookmarks of the user
     * then add these bookmarks to the current houses
     */
    function getBookmarksOfHouses() {
        getBookmarksOfUser(user).then(getBookmarksOfHousesHandler);

        function getBookmarksOfHousesHandler(bookmarks) {
            addBookmarksToHouses(bookmarks, vm.houses)
        }

        function addBookmarksToHouses(bookmarks, houses) {
            houses.forEach(function (house) {
                bookmarks.forEach(function (bookmark) {
                    if (bookmark.house_id == house.id) {
                        house.bookmark = true;
                        house.bookmark_id = bookmark.id;
                    }
                });
            });
        }
    }

    /**
     * get all bookmarks of the user
     * @param {object} user user object
     */
    function getBookmarksOfUser(user) {
        return bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                return response.data;
            }
            appService.alert(response.data);
        }
    }
}
angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['user', 'houseTypes', 'currencies', 'regions', 'appService', 'bookmarkService', 'houseService', 'userService']
function searchHouseController(user, houseTypes, currencies, regions, appService, bookmarkService, houseService, userService) {
    let vm = this;
    vm.user = user;
    vm.houseTypes = houseTypes;
    vm.currencies = currencies;
    vm.submit = submit;
    vm.resetFilter = resetFilter;
    vm.bookmark = bookmark;
    vm.contact = contact;
    vm.sendMail = sendMail;
    
    appService.initRegionAutocomplete(regions);
    /**
     * submits a form
     * @param {object} house search house
     */
    function submit(house) {
        if (!house.region) {
            return appService.alert('Region is required');
        }
        splitAddress(house.region);
        houseService.getHouses(house).then(getHousesHandler);
        vm.searchMode = false;
        vm.loading = true;

        function getHousesHandler(response) {
            vm.loading = false;            
            if (response.status === 200) {
                vm.results = response.data;
                return;
            }
            appService.alert(response.status + ': ' + response.statusText);
        }
    }

    /**
    * splits address text and assigns values to house object
    * @param {string} address address text
    */
    function splitAddress(address) {
        let str = address.split(', ');
        vm.house.postal_code = str[0];
        vm.house.city = str[1];
        vm.house.land = str[2];
    }

    function resetFilter() {
        vm.house = {
            minSize: 0,
            rooms: 0,
            bathrooms: 0,
            bedrooms: 0
        };
    }
    
    /**
     * add the house to focus for email sending
     * @param {object} house house
     */
    function contact(house) {
        vm.agent = {
            username: house.username,
            email: house.email
        };
    }

    /**
     * send email to the receiver
     * @param {object} receiver 
     */
    function sendMail(receiver) {
        if (!vm.agent.message) {
            appService.alert('Empty message cannot be sent.');
            return;
        }
        appService.alert('Sending...');
        let sender = vm.user.email;
        let redirectAddress = 'eragonwien@gmail.com'; // redirect email to dev instead
        let text = getText(sender, receiver, vm.agent.message.content);
        let params = {
            sender: sender,
            receiver: redirectAddress, 
            subject: vm.agent.message.subject,
            text: text
        }
        appService.sendMail(params).then(sendMailHandler);

        function sendMailHandler(response) {
            if (response.status == 200) {
                return appService.alert('Email is sent.');
            }
            appService.alert('Error: ' + response.data);
        }
    }

    /**
     * create a generic email message 
     * @param {string} sender address of sender
     * @param {string} receiver address of receiver
     * @param {string} text content of the email
     */
    function getText(sender, receiver, text) {
        let result = 'Redirect info: \n';
        result += 'From: ' + sender + '\n';
        result += 'To: ' + receiver.email + ' of ' + receiver.username + '\n';
        result += '**********************\n';
        result += text + '\n';
        return result;
    }

    /**
     * add or remove the house from bookmark
     * @param {object} house house
     */
    function bookmark(house) {
        if (house.bookmark) {
            return addBookmark(house);
        }
        removeBookmark(house);
    }

    /**
     * add this house to bookmark
     * @param {object} house house
     */
    function addBookmark(house) {
        let data = {
            user_id: vm.user.id,
            house_id: house.id
        }
        bookmarkService.createBookmark(data).then(createBookmarkHandler);
        house.bookmark = true;

        function createBookmarkHandler(response) {
            if (response.status == 200) {
                return appService.alert('Bookmark added: Nr.' + response.data.insertId);
            }
            appService.alert(response.data, 10000);
        }
    }

    /**
     * remove bookmark of the specific house
     * @param {object} house house
     */
    function removeBookmark(house) {
        bookmarkService.deleteBookmarkById(house.bookmark_id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                house.bookmark = false;
                return appService.alert('Bookmark removed');
            }
            appService.alert(response.data);
        }
    }

    /**
     * get all bookmarks of the user
     * then add these bookmarks to the current houses
     */
    function getBookmarksOfHouses() {
        getBookmarksOfUser(user).then(getBookmarksOfHousesHandler);

        function getBookmarksOfHousesHandler(bookmarks) {
            addBookmarksToHouses(bookmarks, vm.houses)
        }

        function addBookmarksToHouses(bookmarks, houses) {
            houses.forEach(function (house) {
                bookmarks.forEach(function (bookmark) {
                    if (bookmark.house_id == house.id) {
                        house.bookmark = true;
                        house.bookmark_id = bookmark.id;
                    }
                });
            });
        }
    }

    /**
     * get all bookmarks of the user
     * @param {object} user user object
     */
    function getBookmarksOfUser(user) {
        return bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                return response.data;
            }
            appService.alert(response.data);
        }
    }
}
angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['user', 'userService', 'appService'];
function loginController(user, userService, appService) {
    let vm = this;
    vm.loginMode = true;
    vm.login = login;
    vm.testLogin = testLogin;
    
    if (user) {
        return appService.moveTo();
    }

    function login(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        initLogin(vm.user.username, vm.user.password);
    }

    function validateForm(form) {
        return form.$valid;
    }

    function testLogin() {
        let username = 'test';
        let password = 'test';
        initLogin(username, password);
    }

    function initLogin(username, password) {
        userService.login(username, password).then(loginHandler);

        function loginHandler(response) {
            let status = response.status;
            if (status == 200) {
                userService.setLocalUser(response.data, vm.user.remember);
                appService.moveTo();
                return;
            }
            if (status == 401) {
                appService.alert(response.data);
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }
}
angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['user', 'regions', 'userService', 'appService', 'houseService', 'bookmarkService'];
function profileController(user, regions, userService, appService, houseService, bookmarkService) {
    let vm = this;
    vm.user = user;
    vm.editing = false;
    vm.save = save;
    vm.loading = false;
    vm.deleteHouse = deleteHouse;
    vm.removeBookmark = removeBookmark;

    if (!user) {
        return appService.moveTo();
    }

    getOffers();
    getBookmarksOfUser(user);
    appService.initRegionAutocomplete(regions);

    function save(form) {
        if (!form.$valid) {
            vm.message = "Invalid Form";
            return;
        }
        if (!vm.user.region) {
            appService.alert('Region required');
            return;
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        delete vm.user.address_id;
        userService.update(vm.user).then(updateHandler);
        
        function updateHandler(response) {
            let status = response.status;
            if (status == 200) {
                userService.setLocalUser(vm.user);
                appService.alert('Changes saved.');
                vm.editing = false;               
                return; 
            }
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function getOffers() {
        return houseService.getHouses({user_id: vm.user.id}).then(getHousesHandler);

        function getHousesHandler(response) {
            if (response.status == 200) {
                vm.offers = response.data;
                return;
            }
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function deleteHouse(house) {
        houseService.deleteHouse(house).then(deleteHouseHandler);

        function deleteHouseHandler(response) {
            if (response.status == 200) {
                // remove house from current list
                let index = vm.offers.indexOf(house);
                vm.offers.splice(index, 1);
                appService.alert('Nr.' + house.id + ' is successfully deleted.');
                return;                
            }
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function getBookmarksOfUser(user) {
        bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                vm.bookmarks = response.data;
                return;
            }
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function removeBookmark(bookmark) {
        bookmarkService.deleteBookmarkById(bookmark.id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                let index = vm.bookmarks.indexOf(bookmark);
                vm.bookmarks.splice(index, 1);
                return appService.alert('Bookmark removed');
            }
            appService.alert(status + ': ' + response.statusText);
        }
        
    }
}
angular
    .module('house')
    .controller('redirectController', redirectController);

redirectController.$inject = ['appService'];
function redirectController(appService) {
    let vm = this;
    
    appService.moveTo();
}
angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['regions', 'userService', 'appService']
function signupController(regions, userService, appService) {
    let vm = this;
    vm.signup = signup;

    appService.initRegionAutocomplete(regions);

    function signup(form) {
        if (!form.$valid) {
            appService.alert('INVALID FORM');
            return;
        }
        if (!vm.user.region) {
            appService.alert('Region required');
            return;
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            let status = response.status;
            if (status == 200) {
                appService.moveTo('login');
                return;
            }
            if (status == 400) {
                appService.alert(response.data.message);
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }

    function validateForm(form) {
        return form.$valid;
    }
}
angular
    .module('house')
    .controller('createAdminController', createAdminController);

createAdminController.$inject = ['user', 'regions', 'userService', 'appService']
function createAdminController(user, regions, userService, appService) {
    let vm = this;
    vm.createAdmin = createAdmin;

    appService.initRegionAutocomplete(regions);

    function createAdmin(form) {
        if (!form.$valid) {
            return appService.alert('INVALID FORM');
        }
        if (!vm.user.region) {
            return appService.alert('Region is required.');
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            if (response.status == 200) {
                appService.alert('Admin created.');
                return appService.moveTo();
            }
            if (response.status == 400) {
                appService.alert(response.data.message);
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }
}