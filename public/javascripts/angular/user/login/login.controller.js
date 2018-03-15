angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['userService', 'appService'];
function loginController(userService, appService) {
    var vm = this;
    vm.loginMode = true;
    vm.login = login;
    vm.signup = signup;
    
    if (userService.getLocalUser()) {
        home();
        return;
    }

    function login(form) {
        if (!validateForm(form)) {
            alert('Form invalid');
            return;
        }
        userService.login(vm.user.username, vm.user.password).then(loginHandler);

        function loginHandler(response) {
            var status = response.status;
            if (status == 200) {
                userService.setLocalUser(response.data);
                home();
                return;
            }
            alert(response.data.message);
        }
    }

    function signup(form) {
        if (!validateForm(form)) {
            alert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.loginMode = true;
                return;
            }
            alert(response)
        }
    }

    function validateForm(form) {
        return form.$valid;
    }

    function home() {
        appService.moveTo();
    }

    function alert(message) {
        appService.alert(message);
    }
}