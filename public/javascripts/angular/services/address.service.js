angular
    .module('house')
    .factory('addressService', addressService);

addressService.$inject = ['$http'];
function addressService(http) {
    var service = {
        getAddresses: getAddresses
    }
    return service;
    
    function getAddresses() {
        return http({
            method: 'GET',
            url: '/api/addresses'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }
}