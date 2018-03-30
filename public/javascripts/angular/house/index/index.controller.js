angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['user', 'houses', 'message', 'houseService', 'userService', 'currencyService', 'bookmarkService', 'appService'];
function indexController(user, houses, message, houseService, userService, currencyService, bookmarkService, appService) {
    let vm = this;
    vm.user = user;
    vm.createHouse = createHouse;
    vm.houses = houses;
    vm.contact = contact;
    vm.sendMail = sendMail;
    vm.bookmark = bookmark;
    
    if (message) {
        appService.alert(message);
    }
    if (user) {
        getBookmarksOfHouses();   
    }

    function createHouse() {
        if (!vm.user) {
            appService.alert('Please login first!');
            return;
        }
        appService.moveTo('createHouse');
    }

    function contact(house) {
        vm.agent = {
            username: house.username,
            email: house.email
        }
    }

    function sendMail(receiver) {
        if (!vm.agent.message) {
            appService.alert('Empty message cannot be sent.');
            return;
        }
        appService.alert('Sending...');
        let sender = vm.user.email;
        let receiver = 'eragonwien@gmail.com'; // redirect email to dev instead
        let text = getText(sender, receiver, vm.agent.message.content);
        let params = {
            sender: sender,
            receiver: receiver, 
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

    function getText(sender, receiver, text) {
        let result = 'Redirect info: \n';
        result += 'From: ' + sender + '\n';
        result += 'To: ' + receiver + '\n';
        result += '**********************\n';
        result += text + '\n';
        return result;
    }

    function bookmark(house) {
        if (house.bookmark) {
            return addBookmark(house);
        }
        removeBookmark(house);
    }

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