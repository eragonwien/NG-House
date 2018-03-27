angular
    .module('house')
    .controller('signupController', signupController);

signupController.$inject = ['userService', 'appService']
function signupController(userService, appService) {
    var vm = this;
    vm.signup = signup;

    function signup(form) {
        if (!validateForm(form)) {
            alert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                moveTo('login');
                return;
            }
            alert('Error: ' + response.data.code);
        }
    }

    function validateForm(form) {
        return form.$valid;
    }

    function alert(message) {
        appService.alert(message);
    }

    function moveTo(path) {
        appService.moveTo(path);
    }
}