angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['user', 'userService', 'appService', 'houseService', 'bookmarkService'];
function profileController(user, userService, appService, houseService, bookmarkService) {
    var vm = this;
    vm.user = user;
    vm.editing = false;
    vm.save = save;
    vm.loading = false;
    vm.deleteHouse = deleteHouse;
    vm.removeBookmark = removeBookmark;

    getOffers();
    getBookmarksOfUser(user);

    function save(form) {
        if (!form.$valid) {
            vm.message = "Invalid Form";
            return;
        }
        userService.update(vm.user).then(updateHandler);
        
        function updateHandler(response) {
            var status = response.status;
            if (status == 200) {
                userService.setLocalUser(vm.user);
                alert('Changes saved.');
                vm.editing = false;               
                return; 
            }
            alert('Error: ' + response);
        }
    }

    function getOffers() {
        return houseService.getHouses({user_id: vm.user.id}).then(getHousesHandler);

        function getHousesHandler(response) {
            if (response.status == 200) {
                vm.offers = response.data;
                return;
            }
            alert('Error: ' + response.data);
        }
    }

    function deleteHouse(house) {
        houseService.deleteHouse(house).then(deleteHouseHandler);

        function deleteHouseHandler(response) {
            if (response.status == 200) {
                // remove house from current list
                var index = vm.offers.indexOf(house);
                vm.offers.splice(index, 1);
                alert('Nr.' + house.id + ' is successfully deleted.');
                return;                
            }
            alert(response.data);
        }
    }

    function getBookmarksOfUser(user) {
        bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                vm.bookmarks = response.data;
                return;
            }
            alert(response.data);
        }
    }

    function removeBookmark(bookmark) {
        bookmarkService.deleteBookmarkById(bookmark.id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                var index = vm.bookmarks.indexOf(bookmark);
                vm.bookmarks.splice(index, 1);
                return alert('Bookmark removed');
            }
            alert(response.data);
        }
        
    }

    function alert(message) {
        appService.alert(message);
    }
}