angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['userService', '$location']
function signupController(userService, location) {
    var vm = this;
    vm.signup = signup;
    vm.closeAlert = closeAlert;

    function signup(form) {
        if (!validateForm(form)) {
            alert('Form invalid', false);
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                location.url('/login');
                return;
            }
            alert(response, false);
        }
    }

    function validateForm(form) {
        return form.$valid;
    }

    function alert(message, success) {
        vm.message = message;
        vm.alertMode = (success) ? 'green':'red';
    }

    function closeAlert() {
        vm.message = null;
        vm.alertMode = null;
    }
}