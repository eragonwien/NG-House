angular
    .module('house')
    .factory('houseService', houseService);

houseService.$inject = ['$http']
function houseService(http) {
    var service = {
        getHouses: getHouses,
        addHouse: addHouse,
        updateHouse: updateHouse,
        deleteHouse: deleteHouse        
    }
    return service;

    function getHouses(params) {
        return http({
            method: 'GET',
            url: '/api/houses',
            params: params
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

    function deleteHouse(house) {
        return http({
            method: 'DELETE',
            url: '/api/houses/' + house.id
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function updateHouse(house) {
        return http({
            method: 'PUT',
            url: '/api/houses/' + house.id,
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