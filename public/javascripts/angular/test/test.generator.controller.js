angular
    .module('house')
    .controller('testController', testController);

testController.$inject = ['appService', 'testService']
function testController(appService, testService) {
    let vm = this;

    vm.generate = generate;
    vm.loading = false;
    vm.case = {};
    vm.case.names = ['Lazy', 'Dog', 'Jump', 'Over', 'Quick', 'Brown', 'Fox', 'Red'];

    function generate(test) {
        if (!test.type || !test.number) {
            return appService.alert('INVALID FORM');
        }
        testService.sendTest(test).then(sendTestHandler);
        vm.loading = true;

        function sendTestHandler(response) {
            vm.loading = false;
            let status = response.status;
            if (status == 200) {
                return appService.alert(response.data.count + ' ' + test.type + 's created.');
            }
            console.log(response.data);
            appService.alert('error creating test. code: ' + status);
        }
    }
}