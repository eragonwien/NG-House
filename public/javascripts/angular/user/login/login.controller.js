angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['userService', '$location'];
function loginController(userService, location) {
    var vm = this;
    vm.loginMode = true;
    vm.login = login;
    vm.signup = signup;
    
    if (userService.getLocalUser()) {
        toHome();
        return;
    }

    function login(form) {
        if (!validateForm(form)) {
            showAlert('Form invalid');
            return;
        }
        userService.login(vm.user.username, vm.user.password).then(loginHandler);

        function loginHandler(response) {
            var status = response.status;
            if (status == 200) {
                userService.setLocalUser(response.data);
                toHome();
                return;
            }
            showAlert(response.data.message);
        }
    }

    function signup(form) {
        if (!validateForm(form)) {
            showAlert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.loginMode = true;
                return;
            }
            showAlert(response)
        }
    }

    function validateForm(form) {
        return form.$valid;
    }

    function toHome() {
        location.url('/');
    }

    function showAlert(message) {
        console.log(message);
    }
}