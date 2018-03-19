angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state', '$window']
function appService(state, window) {
    var service = {
        alert: alert,
        moveTo: moveTo,
        reload: reload,
        getMessage: getMessage,
        setMessage: setMessage,
        deleteMessage: deleteMessage
    }
    return service;

    function alert(message, duration) {
        var duration = (duration) ? duration: 5000;
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        Materialize.toast(message, duration);
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
}