angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state', '$window', '$http']
function appService(state, window, http) {
    var service = {
        alert: alert,
        moveTo: moveTo,
        reload: reload,
        getMessage: getMessage,
        setMessage: setMessage,
        deleteMessage: deleteMessage,
        sendMail: sendMail
    }
    return service;

    function alert(message, duration) {
        var duration = (duration) ? duration: 5000;
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        M.toast({
            html: message
        });
    }

    function moveTo(path) {
        if (!path) {
            path = 'index';
        }
        state.go(path);
    }

    function reload() {
        window.location.reload();
    }

    function getMessage() {
        return window.localStorage.getItem('message');
    }

    function setMessage(message) {
        window.localStorage.setItem('message', message);
    }

    function deleteMessage() {
        window.localStorage.removeItem('message');
    }

    function sendMail(params) {
        return http({
            method: 'POST',
            url: '/mailer',
            data: params
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}