angular
    .module('house')
    .factory('currencyService', currencyService);

currencyService.$inject = ['$http', '$q'];
function currencyService(http, q) {
    var service = {
        getCurrencies: getCurrencies
    }
    return service;

    function getCurrencies() {
        return http({
            method: 'GET',
            url: '/api/currencies'
        }).then(getCurrenciesSuccess, getCurrenciesError);

        function getCurrenciesSuccess(response) {
            return response;
        }

        function getCurrenciesError(response) {
            return response;
        }
    }
}