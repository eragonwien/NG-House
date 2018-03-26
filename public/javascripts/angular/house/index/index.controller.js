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
    
    if (message) {
        alert(message);
        appService.deleteMessage(); // delete message after consuming    
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
            alert(response.data);
        }
    }

    function createHouse() {
        if (!vm.user) {
            alert('Please login first!');
            return;
        }
        moveTo('createHouse');
    }

    function showHouse(house) {
        alert(house);
    }

    /* General */

    function alert(message) {
        appService.alert(message);
    }

    function moveTo(path) {
        appService.moveTo(path);
    }

    function contact(house) {
        vm.agent = {
            username: house.username,
            email: house.email
        }
    }

    function sendMail(receiver) {
        alert('Sending...');
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
                return alert('Email is sent.');
            }
            alert('Error: ' + response.data);
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
}