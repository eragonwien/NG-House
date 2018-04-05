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
    vm.loading = false;

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
        vm.loading = true;
        houseService.addHouse(vm.newHouse).then(addHouseHandler);

        function addHouseHandler(response) {
            vm.loading = false;
            if (response.status == 200) {
                appService.alert('Successfully added.');
                appService.moveTo();
                return;
            }
            if (response.status == 401) {
                appService.alert(response.status + ': Unauthorized.');
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