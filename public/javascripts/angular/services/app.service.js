angular
    .module('house')
    .factory('appService', appService);

appService.$inject = ['$state', '$window', '$http']
function appService(state, window, http) {
    let service = {
        alert: alert,
        moveTo: moveTo,
        reload: reload,
        getMessage: getMessage,
        setMessage: setMessage,
        deleteMessage: deleteMessage,
        getErrorMessage: getErrorMessage,
        sendMail: sendMail,
        initRegionAutocomplete: initRegionAutocomplete,
        getUserPostalCode: getUserPostalCode
    };
    return service;

    /**
     * show a short message 
     * 
     * @param {string} message text message
     * @param {number} duration duration of the message in ms
     */
    function alert(message, duration) {
        duration = (duration) ? duration: 5000;
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        M.toast({
            html: message
        });
    }

    /**
     * change url to the given path
     * @param {?string} path path name
     */
    function moveTo(path) {
        if (!path) {
            path = 'index';
        }
        state.go(path);
    }

    /**
     * reload the current page
     */
    function reload() {
        window.location.reload();
    }

    /**
     * get the local stored message
     */
    function getMessage() {
        return window.localStorage.getItem('message');
    }

    /**
     * create or replace the local stored message
     * @param {string} message text message
     */
    function setMessage(message) {
        window.localStorage.setItem('message', message);
    }

    /**
     * delete the content of the local stored message
     */
    function deleteMessage() {
        window.localStorage.removeItem('message');
    }

    /**
     * send an email by passing information per post on server
     * @param {object} params parameter contains sender and receiver information
     */
    function sendMail(params) {
        return http({
            method: 'POST',
            url: '/mailer',
            data: params
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    /**
     * interprets error object
     * @param {object} error error object
     */
    function getErrorMessage(error) {
        return error;
    }

    function initRegionAutocomplete(regions) {
        let results = filterRegions(regions);
        let elem = document.querySelector('.autocomplete');
        let options = {
            data: results
        };
        let instance = M.Autocomplete.init(elem, options);


        function filterRegions(regions) {
            let results = {};
            for (let i = 0; i < regions.length; i++) {
                let region = regions[i];
                let key =  region.postal_code_code + ', ' + region.city_name + ', ' + region.land_name;
                results[key] = null;
            }
            return results;
        }
    }

    function getUserPostalCode(address, regions) {
        let postal_code_id = getRegionIdByAddress(regions, getAddress(address));
        return postal_code_id;
        /**
         * compares and returns the postal code id of the address   
         * @param {object} address address with code, city and land properties
         * @return {number} postal code id
         */
        function getRegionIdByAddress(regions, address) {
            for (let i = 0; i < regions.length; i++) {
                let region = regions[i];
                if (region.postal_code_code === address.postal_code_code && region.city_name === address.city_name && region.land_name === address.land_name) {
                    return region.id;
                }
            }
        }

        /**
         * converts string into address
         * @param {string} address addres string
         * @return {object} address with code, city and land names
         */
        function getAddress(address) {
            let result = {
                postal_code_code: null,
                city_name: null,
                land_name: null
            };
            let str = address.split(', ');
            result.postal_code_code = str[0];
            result.city_name = str[1];
            result.land_name = str[2];
            return result;
        }
    }
}