angular
    .module('house')
    .factory('houseTypeService', houseTypeService);

houseTypeService.$inject = ['$http'];
function houseTypeService(http) {
    var service = {
        getHouseTypes: getHouseTypes
    }
    return service;

    function getHouseTypes() {
        return http({
            method: 'GET',
            url: '/api/houseTypes'
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}