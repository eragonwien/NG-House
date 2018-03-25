angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['user', 'userService', 'appService', 'houseService'];
function profileController(user, userService, appService, houseService) {
    var vm = this;
    vm.user = user;
    vm.editing = false;
    vm.save = save;
    vm.loading = false;
    vm.offers = getOffers();
    vm.edit = edit;
    vm.deleteHouse = deleteHouse;

    function save(form) {
        if (!form.$valid) {
            vm.message = "Invalid Form";
            return;
        }
        userService.update(vm.user).then(updateHandler);
        
        function updateHandler(response) {
            var status = response.status;
            if (status == 200) {
                userService.setLocalUser(vm.user);
                alert('Changes saved.');
                vm.editing = false;               
                return; 
            }
            alert('Error: ' + response);
        }
    }

    function getOffers() {
        return houseService.getHouses({user_id: vm.user.id}).then(getHousesHandler);

        function getHousesHandler(response) {
            if (response.status == 200) {
                vm.offers = response.data;
                return;
            }
            alert('Error: ' + response.data);
        }
    }

    function edit(house) {
        alert('ID: ' + house.id);
    }

    function deleteHouse(house) {
        houseService.deleteHouse(house).then(deleteHouseHandler);

        function deleteHouseHandler(response) {
            if (response.status == 200) {
                // remove house from current list
                var index = vm.offers.indexOf(house);
                vm.offers.splice(index, 1);
                alert('Nr.' + house.id + ' is successfully deleted.');
                return;                
            }
            alert(response.data);
        }
    }

    function alert(message) {
        appService.alert(message);
    }
}