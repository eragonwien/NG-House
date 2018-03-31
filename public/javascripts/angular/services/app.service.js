angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state', '$window', '$http']
function appService(state, window, http) {
    let service = {
        alert: alert,
        moveTo: moveTo,
        reload: reload,
        getMessage: getMessage,
        setMessage: setMessage,
        deleteMessage: deleteMessage,
        getErrorMessage: getErrorMessage,
        sendMail: sendMail
    }
    return service;

    /**
     * show a short message 
     * 
     * @param {string} message text message
     * @param {number} duration duration of the message in ms
     */
    function alert(message, duration) {
        duration = (duration) ? duration: 5000;
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        M.toast({
            html: message
        });
    }

    /**
     * change url to the given path
     * @param {?string} path path name
     */
    function moveTo(path) {
        if (!path) {
            path = 'index';
        }
        state.go(path);
    }

    /**
     * reload the current page
     */
    function reload() {
        window.location.reload();
    }

    /**
     * get the local stored message
     */
    function getMessage() {
        return window.localStorage.getItem('message');
    }

    /**
     * create or replace the local stored message
     * @param {string} message text message
     */
    function setMessage(message) {
        window.localStorage.setItem('message', message);
    }

    /**
     * delete the content of the local stored message
     */
    function deleteMessage() {
        window.localStorage.removeItem('message');
    }

    /**
     * send an email by passing information per post on server
     * @param {object} params parameter contains sender and receiver information
     */
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

    /**
     * interprets error object
     * @param {object} error error object
     */
    function getErrorMessage(error) {
        return error;
    }
}