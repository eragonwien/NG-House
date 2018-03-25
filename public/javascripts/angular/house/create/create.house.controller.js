angular
    .module('house')
    .controller('createHouseController', createHouseController);

createHouseController.$inject = ['user', 'currencies', 'houseTypes', 'houseService', 'currencyService', 'userService', 'houseTypeService', 'appService']
function createHouseController(user, currencies, houseTypes, houseService, currencyService, userService, houseTypeService, appService) {
    var vm = this;
    vm.user = user;
    vm.getCurrencies = getCurrencies;
    vm.submit = submit;
    vm.currencies = currencies;
    vm.houseTypes = houseTypes;

    /* Create House */
    function submit(form) {
        if (!form.$valid) {
            alert('Invalid Form');
            return;
        }
        houseService.addHouse(vm.newHouse).then(addHouseHandler);

        function addHouseHandler(response) {
            if (response.status == 200) {
                alert('Successfully added.');
                moveTo();
                return;
            }
            alert(response.data);
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
            alert(response.data, 10000);
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
            alert(response.data);
        }
    }

    function alert(message, duration) {
        appService.alert(message, duration);
    }

    function moveTo(path) {
        appService.moveTo(path);
    }
}