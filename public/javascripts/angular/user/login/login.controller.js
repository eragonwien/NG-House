angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['user', 'userService', 'appService'];
function loginController(user, userService, appService) {
    var vm = this;
    vm.loginMode = true;
    vm.login = login;
    vm.signup = signup;
    
    if (user) {
        return appService.moveTo();
    }

    function login(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        userService.login(vm.user.username, vm.user.password).then(loginHandler);

        function loginHandler(response) {
            var status = response.status;
            if (status == 200) {
                userService.setLocalUser(response.data, vm.user.remember);
                appService.moveTo();
                return;
            }
            console.log(response);
            appService.alert(response);
        }
    }

    function signup(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        userService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.loginMode = true;
                return;
            }
            appService.alert(response)
        }
    }

    function validateForm(form) {
        return form.$valid;
    }

}