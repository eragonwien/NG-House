angular
    .module('house')
    .controller('redirectController', redirectController);

redirectController.$inject = ['appService'];
function redirectController(appService) {
    let vm = this;
    
    appService.moveTo();
}