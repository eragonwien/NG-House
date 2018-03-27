angular
    .module('house')
    .controller('indexController', indexController);
indexController.$inject = ['user', 'houses', 'message', 'houseService', 'userService', 'currencyService', 'appService'];
function indexController(user, houses, message, houseService, userService, currencyService, appService) {
    var vm = this;
    vm.user = user;
    vm.showHouse = showHouse;
    vm.createHouse = createHouse;
    vm.houses = houses;
    vm.contact = contact;
    vm.sendMail = sendMail;
    vm.bookmark = bookmark;
    
    if (message) {
        appService.alert(message);
    }

    /* House */
    function getHouses() {
        houseService.getHouses().then(getHousesHandler);

        function getHousesHandler(response) {
            var status = response.status;
            if (status == 200) {
                vm.houses = response.data;
                return;
            }
            appService.alert(response.data);
        }
    }

    function createHouse() {
        if (!vm.user) {
            appService.alert('Please login first!');
            return;
        }
        appService.moveTo('createHouse');
    }

    function showHouse(house) {
        appService.alert(house);
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
        var sender = vm.user.email;
        var receiver = 'eragonwien@gmail.com'; // redirect email to dev instead
        var text = getText(sender, receiver, vm.agent.message.content);
        var params = {
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
        var result = 'Redirect info: \n';
        result += 'From: ' + sender + '\n';
        result += 'To: ' + receiver + '\n';
        result += '**********************\n';
        result += text + '\n';
        return result;
    }

    function bookmark(house) {
        house.bookmark = house.bookmark ? false : true;
    }
}