angular
    .module('house')
    .factory('userService', userService);

userService.$inject = ['$window', '$http'];
function userService(window, http) {
    var service = {
        getLocalUser: getLocalUser,
        setLocalUser: setLocalUser,
        deleteLocalUser: deleteLocalUser,
        login: login,
        signup: signup,
        update: update,
        logout: logout
    }
    return service;

    function getLocalUser() {
        var local = window.localStorage.getItem('user');
        var session = window.sessionStorage.getItem('user');
        var result = (session) ? session : local;
        return JSON.parse(result);
    }

    function setLocalUser(user, remember) {
        if (remember) {
            window.localStorage.setItem('user', JSON.stringify(user));
            return;
        }
        window.sessionStorage.setItem('user', JSON.stringify(user));
    }

    function deleteLocalUser() {
        window.localStorage.removeItem('user');
        window.sessionStorage.removeItem('user');
    }

    function login(username, password) {
        return http({
            method: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        }).then(loginSuccess, loginError);

        function loginSuccess(response) {
            return response;
        }

        function loginError(response) {
            return response;
        }
    }
    
    function signup(user) {
        return http({
            method: 'POST',
            url: '/api/users',
            data: user
        }).then(signupSuccess, signupError);

        function signupSuccess(response) {
            return response;
        }

        function signupError(response) {
            return response;
        }
    }

    function update(user) {
        return http({
            method: 'PUT',
            url: '/api/users/' + user.id,
            data: user
        }).then(updateSuccess, updateError);

        function updateSuccess(response) {
            return response;
        }

        function updateError(response) {
            return response;
        }
    }

    function logout() {
        console.log('response');
        
        return http({
            method: 'POST',
            url: '/logout'
        }).then(logoutSuccess, logoutError);

        function logoutSuccess(response) {
            console.log(response);
            return response;
        }

        function logoutError(response) {
            console.log(response);
            
            return response;
        }
    }
}