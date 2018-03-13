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
        update: update
    }
    return service;

    function getLocalUser() {
        return JSON.parse(window.localStorage.getItem('user'));
    }

    function setLocalUser(user) {
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    function deleteLocalUser() {
        window.localStorage.removeItem('user');
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
}