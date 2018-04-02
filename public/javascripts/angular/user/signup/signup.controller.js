angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['regions', 'userService', 'appService']
function signupController(regions, userService, appService) {
    let vm = this;
    vm.signup = signup;

    initAutocomplete();

    function signup(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            let status = response.status;
            if (status == 200) {
                appService.moveTo('login');
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }

    function validateForm(form) {
        return form.$valid;
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