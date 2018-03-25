angular
    .module('house')
    .controller('editHouseController', editHouseController);

editHouseController.$inject = ['message', 'user', 'currencies', 'houseTypes', 'houseService', 'appService']
function editHouseController(message, user, currencies, houseTypes, houseService, appService) {
    var vm = this;
    vm.user = user;
    vm.currencies = currencies;
    vm.houseTypes = houseTypes;
    vm.submit = submit;
    vm.cancelEditing = cancelEditing;

    // house
    var houseId = message;
    getHouseById(houseId);

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
        appService.alert(vm.editHouse);
    }

    function cancelEditing() {
        appService.deleteMessage(); // remove the house id  
        appService.moveTo('redirect');
        appService.alert('Editing canceled');
    }
}