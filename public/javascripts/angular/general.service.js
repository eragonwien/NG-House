angular
    .module('house')
    .factory('generalService', generalService);

function generalService() {
    var service = {
        alert: alert,
        closeAlerts: closeAlerts
    }
    return service;

    function alert(message, duration) {
        var duration = (duration) ? duration: 10000;
        Materialize.toast(message, duration);
    }

    function closeAlerts() {
        Materialize.Toast.removeAll();
    }
}