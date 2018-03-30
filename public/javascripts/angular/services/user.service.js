angular
    .module('house')
    .factory('userService', userService);

userService.$inject = ['$window', '$http'];
function userService(window, http) {
    let service = {
        getLocalUser: getLocalUser,
        setLocalUser: setLocalUser,
        deleteLocalUser: deleteLocalUser,
        login: login,
        signup: signup,
        update: update,
        logout: logout,
        getUser: getUser
    }
    return service;

    function getLocalUser() {
        let local = window.localStorage.getItem('user');
        let session = window.sessionStorage.getItem('user');
        let result = (session) ? session : local;
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
    
    /**
     * create a new user per http request
     * 
     * @param {object} user object user
     * @returns {object} response
     */
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
        return http({
            method: 'GET',
            url: '/logout'
        }).then(logoutSuccess, logoutError);

        function logoutSuccess(response) {
            return response;
        }

        function logoutError(response) {            
            return response;
        }
    }

    function getUser(user_id) {
        // check if the session is still valid
        return http({
            method: 'GET',
            url: 'api/users/' + user_id
        }).then(getUserSuccess, getUserError);

        function getUserSuccess(response) {
            return response;
        }

        function getUserError(response) {
            return response;
        }
    }
}