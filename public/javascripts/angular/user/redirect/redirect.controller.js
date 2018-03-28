angular
    .module('house')
    .controller('redirectController', redirectController);

redirectController.$inject = ['appService'];
function redirectController(appService) {
    var vm = this;
    
    appService.moveTo();
}