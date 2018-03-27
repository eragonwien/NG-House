angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['userService', 'appService']
function signupController(userService, appService) {
    var vm = this;
    vm.signup = signup;

    function signup(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                appService.moveTo('login');
                return;
            }
            appService.alert('Error: ' + response.data.code);
        }
    }

    function validateForm(form) {
        return form.$valid;
    }
}