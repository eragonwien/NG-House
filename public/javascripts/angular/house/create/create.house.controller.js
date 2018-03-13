angular
    .module('house')
    .controller('createHouseController', createHouseController);

createHouseController.$inject = ['houseService', 'currencyService', 'userService', 'houseTypeService', 'generalService']
function createHouseController(houseService, currencyService, userService, houseTypeService, generalService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.getCurrencies = getCurrencies;
    vm.addHouse = addHouse;

    getCurrencies();
    getHouseTypes();

    /* Create House */
    function addHouse(house) {
        generalService.alert(JSON.stringify(house));
    }

    /* Currency */
    function getCurrencies() {
        currencyService.getCurrencies().then(getCurrenciesHandler);

        function getCurrenciesHandler(response) {
            if (response.status == 200) {
                vm.currencies = response.data;
                return;
            }
            generalService.alert(response.data);
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
            generalService.alert(response.data);
        }
    }
}