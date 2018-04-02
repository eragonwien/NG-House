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
        delete user.address_id;
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

    function initAutocomplete() {
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

    function setUserPostalCode(address) {
        let postal_code_id = getRegionIdByAddress(regions, getAddress(address));
        vm.user.postal_code_id = postal_code_id;
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