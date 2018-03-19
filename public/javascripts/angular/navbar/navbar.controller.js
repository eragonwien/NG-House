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
        userService.deleteLocalUser();
        appService.moveTo('redirect');
    }
}