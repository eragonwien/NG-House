angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['houseTypes', 'appService']
function searchHouseController(houseTypes, appService) {
    var vm = this;
    vm.houseTypes = houseTypes;
    vm.submit = submit;

    /**
     * submits a form
     * @param {object} form search form
     * @param {object} house search house
     */
    function submit(form, house) {
        alert(JSON.stringify(house));
    }

    function alert(message, duration) {
        appService.alert(message, duration);
    }
}