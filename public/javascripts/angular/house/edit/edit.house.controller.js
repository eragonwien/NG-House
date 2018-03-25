angular
    .module('house')
    .controller('editHouseController', editHouseController);

editHouseController.$inject = ['message', 'houseService']
function editHouseController(message, houseService) {
    var vm = this;
    
    // house
    var houseId = message;
    getHouseById(houseId);

    function getHouseById(id) {
        houseService.getHouses({id: id}).then(getHousesHandler);
    
        function getHousesHandler(response) {
            console.log(response);
            vm.house = response.data;
            vm.editHouse = response.data;
        }
    }
}