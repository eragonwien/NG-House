angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['user', 'houses', 'houseService', 'userService', 'currencyService', 'appService'];
function indexController(user, houses, houseService, userService, currencyService, appService) {
    var vm = this;
    vm.user = user;
    vm.showHouse = showHouse;
    vm.createHouse = createHouse;
    vm.houses = houses;
    vm.contact = contact;
    
    var appMessage = appService.getMessage();
    if (appMessage) {
        alert(appMessage);
    }

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

    function contact(house) {
        vm.agent = {
            username: house.username
        }
    }
}