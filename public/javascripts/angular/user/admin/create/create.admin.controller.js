angular
    .module('house')
    .controller('createAdminController', createAdminController);

createAdminController.$inject = ['user', 'regions', 'userService', 'appService']
function createAdminController(user, regions, userService, appService) {
    let vm = this;
    vm.createAdmin = createAdmin;

    initAutocomplete();

    function createAdmin(form) {
        if (!form.$valid) {
            return appService.alert('INVALID FORM');
        }
        if (!vm.user.region) {
            return appService.alert('Region is required.');
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            if (response.status == 200) {
                appService.alert('Admin created.');
                return appService.moveTo();
            }
            appService.alert(response.data);
        }
    }

    function initAutocomplete() {
        let results = filterRegions(regions);
        let elem = document.querySelector('.autocomplete');
        let options = {
            data: results,
            onAutocomplete: setUserPostalCode
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