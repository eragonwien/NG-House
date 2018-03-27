angular
    .module('house')
    .factory('bookmarkService', bookmarkService);

bookmarkService.$inject = ['$http']
function bookmarkService(http) {
    var service = {
        getBookmarksByUser: getBookmarksByUser,
        deleteBookmarkById: deleteBookmarkById
    }
    return service;

    function getBookmarksByUser(user_id) {
        return http({
            method: 'GET',
            url: '/api/users/' + user_id + '/bookmarks'
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }

    function deleteBookmarkById(id) {
        return http({
            method: 'DELETE',
            url: '/api/bookmarks/' + id
        }).then(success, error);

        function success(response) {
            return response;
        }

        function error(response) {
            return response;
        }
    }
}