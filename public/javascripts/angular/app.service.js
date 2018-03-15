angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state']
function appService(state) {
    var service = {
        alert: alert,
        moveTo: moveTo
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
}