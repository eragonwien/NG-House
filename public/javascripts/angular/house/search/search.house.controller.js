angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['houseTypes', 'currencies', 'appService', 'houseService']
function searchHouseController(houseTypes, currencies, appService, houseService) {
    var vm = this;
    vm.houseTypes = houseTypes;
    vm.currencies = currencies;
    vm.submit = submit;
    vm.resetFilter = resetFilter;
    /**
     * submits a form
     * @param {object} house search house
     */
    function submit(house) {
        closeCollapsible();
        vm.loading = true;
        splitAddress(house);
        houseService.getHouses({search: house}).then(getHousesHandler);

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
            minRooms: 0,
            bathrooms: 0,
            bedrooms: 0
        }
    }
}