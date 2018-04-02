angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['user', 'regions', 'userService', 'appService', 'houseService', 'bookmarkService'];
function profileController(user, regions, userService, appService, houseService, bookmarkService) {
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
    appService.initRegionAutocomplete(regions);

    function save(form) {
        if (!form.$valid) {
            vm.message = "Invalid Form";
            return;
        }
        if (!vm.user.region) {
            appService.alert('Region required');
            return;
        }
        vm.user.postal_code_id = appService.getUserPostalCode(vm.user.region, regions);
        delete vm.user.address_id;
        userService.update(vm.user).then(updateHandler);
        
        function updateHandler(response) {
            let status = response.status;
            if (status == 200) {
                userService.setLocalUser(vm.user);
                appService.alert('Changes saved.');
                vm.editing = false;               
                return; 
            }
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function getOffers() {
        return houseService.getHouses({user_id: vm.user.id}).then(getHousesHandler);

        function getHousesHandler(response) {
            if (response.status == 200) {
                vm.offers = response.data;
                return;
            }
            appService.alert(status + ': ' + response.statusText);
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
            appService.alert(status + ': ' + response.statusText);
        }
    }

    function getBookmarksOfUser(user) {
        bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                vm.bookmarks = response.data;
                return;
            }
            appService.alert(status + ': ' + response.statusText);
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
            appService.alert(status + ': ' + response.statusText);
        }
        
    }
}