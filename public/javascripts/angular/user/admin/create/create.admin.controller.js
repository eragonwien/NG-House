angular
    .module('house')
    .controller('createAdminController', createAdminController);

createAdminController.$inject = ['user', 'regions', 'userService', 'appService']
function createAdminController(user, regions, userService, appService) {
    let vm = this;
    vm.createAdmin = createAdmin;

    appService.initRegionAutocomplete(regions);

    function createAdmin(form) {
        if (!form.$valid) {
            return appService.alert('INVALID FORM');
        }
        if (!vm.user.region) {
            return appService.alert('Region is required.');
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            if (response.status == 200) {
                appService.alert('Admin created.');
                return appService.moveTo();
            }
            if (response.status == 400) {
                appService.alert(response.data.message);
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }
}