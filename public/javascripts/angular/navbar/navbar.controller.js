angular
    .module('house')
    .controller('navbarController', navbarController);

navbarController.$inject = ['user', 'userService', 'appService']
function navbarController(user, userService, appService) {
    let vm = this;
    vm.user = user;
    vm.reload = reload;
    vm.logout = logout;
    initSideNav();

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

    function initSideNav() {
        let elem = document.querySelector('.sidenav');
        let options = {};
        let instance = M.Sidenav.init(elem, options);
    }
}