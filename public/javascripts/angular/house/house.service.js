angular
    .module('house')
    .factory('houseService', houseService);

houseService.$inject = ['$http']
function houseService(http) {
    var service = {
        getHouses: getHouses,
        addHouse: addHouse
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

    function addHouse(house) {
        return http({
            method: 'POST',
            url: '/api/houses',
            data: house
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}