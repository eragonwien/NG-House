angular
    .module('house')
    .controller('editHouseController', editHouseController);

editHouseController.$inject = ['user', 'house', 'regions', 'currencies', 'houseTypes', 'houseService', 'appService']
function editHouseController(user, house, regions, currencies, houseTypes, houseService, appService) {
    let vm = this;
    vm.user = user;
    vm.editHouse = house;
    vm.currencies = currencies;
    vm.houseTypes = houseTypes;
    vm.submit = submit;
    vm.cancelEditing = cancelEditing;

    appService.initRegionAutocomplete(regions);

    function getHouseById(id) {
        houseService.getHouseById(id).then(getHouseByIdHandler);
    
        function getHouseByIdHandler(response) {
            if (response.status == 200) {
                vm.house = response.data;
                vm.editHouse = response.data;
                return;
            }
            appService.alert(response.data);
        }   
    }

    function submit(form) {
        if (!form.$valid) {
            appService.alert('INVALID FORM');
            return;
        }
        if (!vm.editHouse.region) {
            appService.alert('Region is required');
            return;
        }
        vm.editHouse.postal_code_id = appService.getUserPostalCode(vm.editHouse.region, regions);
        delete vm.editHouse.address_id;
        houseService.updateHouse(vm.editHouse).then(updateHouseHandler);

        function updateHouseHandler(response) {
            if (response.status == 200) {
                
                appService.alert('updated successfully.');
                appService.moveTo('profile');
                return;
            }
            appService.alert('Error: ' + response.data);      
        }
    }

    function cancelEditing() {
        appService.deleteMessage(); // remove the house id  
        appService.moveTo('redirect');
        appService.alert('Editing canceled');
    }
}