angular
    .module('house')
    .factory('addressService', addressService);

addressService.$inject = ['$http'];
function addressService(http) {
    let service = {
        getAddresses: getAddresses,
        getRegions: getRegions
    };
    return service;
    
    /**
     * get all addresses per http
     * 
     * @returns response
     */
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

    function getRegions() {
        return http({
            method: 'GET',
            url: '/api/postalCodes'
        }).then(success, error);

        function success(res) {
            return res;
        }

        function error(res) {
            return res;
        }
    }
}