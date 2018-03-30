angular
    .module('house')
    .factory('testService', testService);

testService.$inject = ['$http']
function testService(http) {
    let service = {
        sendTest: sendTest,
        getRandomUsers: getRandomUsers
    }
    return service;

    function sendTest(test) {
        return http({
            method: 'POST',
            url: '/test',
            data: test
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return error;
        }
    }

    function getRandomUsers(count) {
        return http({
            method: 'GET',
            url: 'https://randomname.de/?format=json&count=' + count
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return error;
        }
    }
}