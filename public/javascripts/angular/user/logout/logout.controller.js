angular
    .module('house')
    .controller('logoutController', logoutController);

logoutController.$inject = ['userService', 'appService'];
function logoutController(userService, appService) {
    var vm = this;
    
    if (userService.getLocalUser()) {
        userService.deleteLocalUser();
    }
    vm.message = "Redirecting to Homepage ...";
    appService.moveTo();
    appService.alert('You are logged out');
}