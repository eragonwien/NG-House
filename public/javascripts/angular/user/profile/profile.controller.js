angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['user', 'userService', 'appService', 'houseService', 'bookmarkService'];
function profileController(user, userService, appService, houseService, bookmarkService) {
    let vm = this;
    vm.user = user;
    vm.editing = false;
    vm.save = save;
    vm.loading = false;
    vm.deleteHouse = deleteHouse;
    vm.removeBookmark = removeBookmark;

    if (!user) {
        return appService.moveTo();
    }

    getOffers();
    getBookmarksOfUser(user);

    function save(form) {
        if (!form.$valid) {
            vm.message = "Invalid Form";
            return;
        }
        userService.update(vm.user).then(updateHandler);
        
        function updateHandler(response) {
            let status = response.status;
            if (status == 200) {
                userService.setLocalUser(vm.user);
                appService.alert('Changes saved.');
                vm.editing = false;               
                return; 
            }
            appService.alert('Error: ' + response);
        }
    }

    function getOffers() {
        return houseService.getHouses({user_id: vm.user.id}).then(getHousesHandler);

        function getHousesHandler(response) {
            if (response.status == 200) {
                vm.offers = response.data;
                return;
            }
            appService.alert('Error: ' + response.data);
        }
    }

    function deleteHouse(house) {
        houseService.deleteHouse(house).then(deleteHouseHandler);

        function deleteHouseHandler(response) {
            if (response.status == 200) {
                // remove house from current list
                let index = vm.offers.indexOf(house);
                vm.offers.splice(index, 1);
                appService.alert('Nr.' + house.id + ' is successfully deleted.');
                return;                
            }
            appService.alert(response.data);
        }
    }

    function getBookmarksOfUser(user) {
        bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                vm.bookmarks = response.data;
                return;
            }
            appService.alert(response.data);
        }
    }

    function removeBookmark(bookmark) {
        bookmarkService.deleteBookmarkById(bookmark.id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                let index = vm.bookmarks.indexOf(bookmark);
                vm.bookmarks.splice(index, 1);
                return appService.alert('Bookmark removed');
            }
            appService.alert(response.data);
        }
        
    }
}