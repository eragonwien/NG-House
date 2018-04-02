angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['user', 'userService', 'appService'];
function loginController(user, userService, appService) {
    let vm = this;
    vm.loginMode = true;
    vm.login = login;
    
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
            let status = response.status;
            if (status == 200) {
                userService.setLocalUser(response.data, vm.user.remember);
                appService.moveTo();
                return;
            }
            if (status == 401) {
                appService.alert(response.data);
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