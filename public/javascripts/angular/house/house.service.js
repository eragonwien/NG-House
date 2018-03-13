angular
    .module('house')
    .factory('houseService', houseService);

houseService.$inject = ['$http']
function houseService(http) {
    var service = {
        getHouses: getHouses
    }
    return service;

    function getHouses() {
        return http({
            method: 'GET',
            url: '/api/houses'
        }).then(getHousesSuccess, getHousesError);

        function getHousesSuccess(response) {
            return response;
        }

        function getHousesError(response) {
            return response;
        }
    }
}