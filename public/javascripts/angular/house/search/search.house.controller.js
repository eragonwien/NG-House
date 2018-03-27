angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['user', 'houseTypes', 'currencies', 'addresses', 'appService', 'houseService', 'userService']
function searchHouseController(user, houseTypes, currencies, addresses, appService, houseService, userService) {
    var vm = this;
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
        closeCollapsible();
        vm.loading = true;
        splitAddress(house);
        houseService.getHouses(house).then(getHousesHandler);

        function getHousesHandler(response) {
            vm.results = response.data;
            vm.loading = false;
        }
    }

    function alert(message, duration) {
        appService.alert(message, duration);
    }

    function splitAddress(house) {
        if (!house.address) {
            return;
        }
        var address = house.address.split(',');
        house.city = address[0];
        house.land = address[1];
        delete house.address;
    }

    function closeCollapsible() {
        $('.collapsible').collapsible('close', 0);
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
        var elem = document.querySelector('.collapsible');
        var options = {};
        var instance = M.Collapsible.init(elem, options);
    }

    function initAutocomplete() {
        var results = filterAddresses(addresses);
        var elem = document.querySelector('.autocomplete');
        var options = {
            data: results
        };
        var instance = M.Autocomplete.init(elem, options);


        function filterAddresses(addresses) {
            var results = {};
            for (let i = 0; i < addresses.length; i++) {
                var address = addresses[i];
                var key =  address.city + ',' + address.land;
                results[key] = null;
            }
            return results;
        }
    }
}