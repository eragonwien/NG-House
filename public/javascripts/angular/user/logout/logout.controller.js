angular
    .module('house')
    .controller('logoutController', logoutController);

logoutController.$inject = ['userService', '$location'];
function logoutController(userService, location) {
    var vm = this;
    
    if (userService.getLocalUser()) {
        location.url('/');
    }
    else {
        vm.message = "You are logged out";
    }
}