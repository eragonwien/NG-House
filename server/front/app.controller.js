angular
    .module('app')
    .controller('appController', appController);

appController.$inject = ['$http'];
function appController(http) {
    var vm = this;
    vm.target = getTarget();
    vm.login = login;
    vm.logout = logout;

    function getTarget() {
        getTargetHttp().then(handler);

        function handler(res) {
            vm.target = res.data;
        }
    }

    function getTargetHttp() {
        return http({
            method: 'GET',
            url: 'http://localhost:3000/api/roles'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }

    function login(user) {
        loginHttp(user).then(handler);

        function handler(res) {
            console.log(res.data);
        }
    }

    function loginHttp(user) {
        return http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: user
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }

    function logout() {
        logoutHttp().then(handler);

        function handler(res) {
            console.log(res.data);
        }
    }

    function logoutHttp() {
        return http({
            method: 'GET',
            url: 'http://localhost:3000/logout'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }
}