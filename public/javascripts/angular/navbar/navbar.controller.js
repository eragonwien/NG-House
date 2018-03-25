angular
    .module('house')
    .controller('navbarController', navbarController);

navbarController.$inject = ['userService', 'appService']
function navbarController(userService, appService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.reload = reload;
    vm.logout = logout;

    function reload() {
        appService.reload();
    }

    function logout() {
        userService.logout().then(logoutHandler);

        function logoutHandler(response) {
            if (response.status == 200) {
                userService.deleteLocalUser();
                appService.alert('Successfully logged out');
            } else {
                appService.alert('Error on logging out');
            }
            appService.moveTo('redirect');
        }
    }
}