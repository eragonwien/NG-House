angular
    .module('house')
    .controller('testController', testController);

testController.$inject = ['appService']
function testController(appService) {
    var vm = this;

    vm.generate = generate;

    function generate(test) {
        if (!test.type || !test.names) {
            return appService.alert('INVALID FORM');
        }

    }
}