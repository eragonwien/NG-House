angular
    .module('house')
    .controller('loginController', loginController);

loginController.$inject = ['user', 'userService', 'appService'];
function loginController(user, userService, appService) {
    let vm = this;
    vm.loginMode = true;
    vm.login = login;
    vm.testLogin = testLogin;
    
    if (user) {
        return appService.moveTo();
    }

    function login(form) {
        if (!validateForm(form)) {
            appService.alert('Form invalid');
            return;
        }
        initLogin(vm.user.username, vm.user.password);
    }

    function validateForm(form) {
        return form.$valid;
    }

    function testLogin() {
        let username = 'test';
        let password = 'test';
        initLogin(username, password);
    }

    function initLogin(username, password) {
        userService.login(username, password).then(loginHandler);

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
}