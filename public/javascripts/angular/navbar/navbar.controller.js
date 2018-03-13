angular
    .module('house')
    .controller('navbarController', navbarController);

navbarController.$inject = ['userService', '$location', '$window']
function navbarController(userService, location, window) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.reload = reload;
    vm.logout = logout;

    function reload() {
        window.location.reload();
    }

    function logout() {
        userService.deleteLocalUser();
        location.url('/logout');
    }
}