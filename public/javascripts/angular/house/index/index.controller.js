angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['houseService', 'userService', 'currencyService'];
function indexController(houseService, userService, currencyService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.showHouse = showHouse;
    vm.closeAlert = closeAlert;
    getHouses();


    /* House */
    function getHouses() {
        houseService.getHouses().then(getHousesHandler);

        function getHousesHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.houses = response.data;
                return;
            }
            alert(response.data, false);
        }
    }

    function showHouse(house) {
        alert(house, true);
    }

    /* General */

    function alert(message, success) {
        vm.message += message + '\n';
        vm.alertMode = (success) ? 'green':'red';
    }

    function closeAlert() {
        vm.message = null;
        vm.alertMode = null;
    }
}