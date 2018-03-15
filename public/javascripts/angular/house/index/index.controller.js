angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['houses', 'houseService', 'userService', 'currencyService', 'appService'];
function indexController(houses, houseService, userService, currencyService, appService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.showHouse = showHouse;
    vm.createHouse = createHouse;
    //getHouses();
    alert(houses, 10000);

    /* House */
    function getHouses() {
        houseService.getHouses().then(getHousesHandler);

        function getHousesHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.houses = response.data;
                return;
            }
            alert(response.data);
        }
    }

    function createHouse() {
        if (!vm.user) {
            alert('Please login first!');
            return;
        }
        moveTo('createHouse');
    }

    function showHouse(house) {
        alert(house);
    }

    /* General */

    function alert(message) {
        appService.alert(message);
    }

    function moveTo(path) {
        appService.moveTo(path);
    }
}