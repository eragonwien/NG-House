angular
    .module('house')
    .controller('createAdminController', createAdminController);

createAdminController.$inject = ['userService', 'appService']
function createAdminController(userService, appService) {
    var vm = this;
    vm.createAdmin = createAdmin;

    function createAdmin(form) {
        if (!form.$valid) {
            return appService.alert('INVALID FORM');
        }
        
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            if (response.status == 200) {
                appService.alert('Admin created.');
                return appService.moveTo();
            }
            appService.alert(response.data);
        }
    }
}