angular
    .module('house')
    .controller('searchHouseController', searchHouseController);

searchHouseController.$inject = ['user', 'houseTypes', 'currencies', 'regions', 'appService', 'bookmarkService', 'houseService', 'userService']
function searchHouseController(user, houseTypes, currencies, regions, appService, bookmarkService, houseService, userService) {
    let vm = this;
    vm.user = user;
    vm.houseTypes = houseTypes;
    vm.currencies = currencies;
    vm.submit = submit;
    vm.resetFilter = resetFilter;
    vm.bookmark = bookmark;
    vm.contact = contact;
    vm.sendMail = sendMail;
    
    appService.initRegionAutocomplete(regions);
    /**
     * submits a form
     * @param {object} house search house
     */
    function submit(house) {
        if (!house.region) {
            return appService.alert('Region is required');
        }
        splitAddress(house.region);
        houseService.getHouses(house).then(getHousesHandler);
        vm.searchMode = false;
        vm.loading = true;

        function getHousesHandler(response) {
            vm.loading = false;            
            if (response.status === 200) {
                vm.results = response.data;
                return;
            }
            appService.alert(response.status + ': ' + response.statusText);
        }
    }

    /**
    * splits address text and assigns values to house object
    * @param {string} address address text
    */
    function splitAddress(address) {
        let str = address.split(', ');
        vm.house.postal_code = str[0];
        vm.house.city = str[1];
        vm.house.land = str[2];
    }

    function resetFilter() {
        vm.house = {
            minSize: 0,
            rooms: 0,
            bathrooms: 0,
            bedrooms: 0
        };
    }
    
    /**
     * add the house to focus for email sending
     * @param {object} house house
     */
    function contact(house) {
        vm.agent = {
            username: house.username,
            email: house.email
        };
    }

    /**
     * send email to the receiver
     * @param {object} receiver 
     */
    function sendMail(receiver) {
        if (!vm.agent.message) {
            appService.alert('Empty message cannot be sent.');
            return;
        }
        appService.alert('Sending...');
        let sender = vm.user.email;
        let redirectAddress = 'eragonwien@gmail.com'; // redirect email to dev instead
        let text = getText(sender, receiver, vm.agent.message.content);
        let params = {
            sender: sender,
            receiver: redirectAddress, 
            subject: vm.agent.message.subject,
            text: text
        }
        appService.sendMail(params).then(sendMailHandler);

        function sendMailHandler(response) {
            if (response.status == 200) {
                return appService.alert('Email is sent.');
            }
            appService.alert('Error: ' + response.data);
        }
    }

    /**
     * create a generic email message 
     * @param {string} sender address of sender
     * @param {string} receiver address of receiver
     * @param {string} text content of the email
     */
    function getText(sender, receiver, text) {
        let result = 'Redirect info: \n';
        result += 'From: ' + sender + '\n';
        result += 'To: ' + receiver.email + ' of ' + receiver.username + '\n';
        result += '**********************\n';
        result += text + '\n';
        return result;
    }

    /**
     * add or remove the house from bookmark
     * @param {object} house house
     */
    function bookmark(house) {
        if (house.bookmark) {
            return addBookmark(house);
        }
        removeBookmark(house);
    }

    /**
     * add this house to bookmark
     * @param {object} house house
     */
    function addBookmark(house) {
        let data = {
            user_id: vm.user.id,
            house_id: house.id
        }
        bookmarkService.createBookmark(data).then(createBookmarkHandler);
        house.bookmark = true;

        function createBookmarkHandler(response) {
            if (response.status == 200) {
                return appService.alert('Bookmark added: Nr.' + response.data.insertId);
            }
            appService.alert(response.data, 10000);
        }
    }

    /**
     * remove bookmark of the specific house
     * @param {object} house house
     */
    function removeBookmark(house) {
        bookmarkService.deleteBookmarkById(house.bookmark_id).then(deleteBookmarkHandler);

        function deleteBookmarkHandler(response) {
            if (response.status == 200) {
                house.bookmark = false;
                return appService.alert('Bookmark removed');
            }
            appService.alert(response.data);
        }
    }

    /**
     * get all bookmarks of the user
     * then add these bookmarks to the current houses
     */
    function getBookmarksOfHouses() {
        getBookmarksOfUser(user).then(getBookmarksOfHousesHandler);

        function getBookmarksOfHousesHandler(bookmarks) {
            addBookmarksToHouses(bookmarks, vm.houses)
        }

        function addBookmarksToHouses(bookmarks, houses) {
            houses.forEach(function (house) {
                bookmarks.forEach(function (bookmark) {
                    if (bookmark.house_id == house.id) {
                        house.bookmark = true;
                        house.bookmark_id = bookmark.id;
                    }
                });
            });
        }
    }

    /**
     * get all bookmarks of the user
     * @param {object} user user object
     */
    function getBookmarksOfUser(user) {
        return bookmarkService.getBookmarksByUser(user.id).then(getBookmarksOfUserHandler);

        function getBookmarksOfUserHandler(response) {
            if (response.status == 200) {
                return response.data;
            }
            appService.alert(response.data);
        }
    }
}