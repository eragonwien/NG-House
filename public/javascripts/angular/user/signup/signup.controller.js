angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['regions', 'userService', 'appService']
function signupController(regions, userService, appService) {
    let vm = this;
    vm.signup = signup;
    vm.loading = false;

    appService.initRegionAutocomplete(regions);

    function signup(form) {
        if (!form.$valid) {
            appService.alert('INVALID FORM');
            return;
        }
        if (!vm.user.region) {
            appService.alert('Region required');
            return;
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        vm.loading = true;
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            let status = response.status;
            vm.loading = false;
            if (status == 200) {
                appService.moveTo('login');
                return;
            }
            if (status == 400) {
                appService.alert(response.data.message);
                return;
            }
            appService.alert(response.status + ' : ' + response.statusText);
            console.log(response.data);
        }
    }

    function validateForm(form) {
        return form.$valid;
    }
}