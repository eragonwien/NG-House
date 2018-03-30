angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['user', 'houseTypes', 'currencies', 'addresses', 'appService', 'houseService', 'userService']
function searchHouseController(user, houseTypes, currencies, addresses, appService, houseService, userService) {
    let vm = this;
    vm.user = user;
    vm.houseTypes = houseTypes;
    vm.currencies = currencies;
    vm.submit = submit;
    vm.resetFilter = resetFilter;
    
    initMaterialize();
    /**
     * submits a form
     * @param {object} house search house
     */
    function submit(house) {
        let hasAddress = splitAddress(house);
        if (!hasAddress) {
            return appService.alert('Address required');
        }
        houseService.getHouses(house).then(getHousesHandler);
        vm.searchMode = false;
        vm.loading = true;

        function getHousesHandler(response) {
            vm.results = response.data;
            vm.loading = false;
        }
    }

    function splitAddress(house) {
        if (!house.address) {
            return false;
        }
        let address = house.address.split(',');
        house.city = address[0];
        house.land = address[1];
        delete house.address;
        return true;
    }

    function resetFilter() {
        vm.house = {
            minSize: 0,
            rooms: 0,
            bathrooms: 0,
            bedrooms: 0
        }
    }

    function initMaterialize() {
        initCollapsible();
        initAutocomplete();
    }

    function initCollapsible() {
        let elem = document.querySelector('.collapsible');
        let options = {};
        let instance = M.Collapsible.init(elem, options);
    }

    function initAutocomplete() {
        let results = filterAddresses(addresses);
        let elem = document.querySelector('.autocomplete');
        let options = {
            data: results
        };
        let instance = M.Autocomplete.init(elem, options);


        function filterAddresses(addresses) {
            let results = {};
            for (let i = 0; i < addresses.length; i++) {
                let address = addresses[i];
                let key =  address.city + ',' + address.land;
                results[key] = null;
            }
            return results;
        }
    }
}