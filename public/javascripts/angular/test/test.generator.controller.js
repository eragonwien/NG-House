angular
    .module('house')
    .controller('testController', testController);

testController.$inject = ['appService', 'testService']
function testController(appService, testService) {
    let vm = this;

    vm.generate = generate;
    vm.loading = false;

    function generate(test) {
        if (!test.type) {
            appService.alert('Test type is required');
            return;
        }
        if (!test.count || test.count < 0) {
            appService.alert('Test type cannot be negative');
            return;
        }
        testService.sendTest(test).then(sendTestHandler);
        vm.loading = true;

        function sendTestHandler(response) {
            vm.loading = false;
            if (response.status == 200) {
                if (response.data.errors) {
                    response.data.errors.forEach(error => {
                        console.error(error);
                    });
                }
                return appService.alert(response.data.count + ' ' + test.type + 's created.');
            }
            appService.alert(response.status + ': ' + response.statusText);
        }
    }
}