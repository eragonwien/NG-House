angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['user', 'houseTypes', 'currencies', 'regions', 'appService', 'houseService', 'userService']
function searchHouseController(user, houseTypes, currencies, regions, appService, houseService, userService) {
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
        if (!house.address) {
            return appService.alert('Address required');
        }
        splitAddress(house.address);
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

    
}