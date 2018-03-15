angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['userService', 'appService'];
function profileController(userService, appService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.editing = false;
    vm.save = save;

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

    function alert(message) {
        appService.alert(message);
    }
}