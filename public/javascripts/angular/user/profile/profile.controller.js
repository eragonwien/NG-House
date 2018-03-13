angular
    .module('house')
    .controller('profileController', profileController);

profileController.$inject = ['userService'];
function profileController(userService) {
    var vm = this;
    vm.user = userService.getLocalUser();
    vm.editing = false;
    vm.save = save;
    vm.closeAlert = closeAlert;
    closeAlert();

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
                alert('Changes saved.', true);
                vm.editing = false;               
                return; 
            }
            alert('Error: ' + response, false);
        }
    }

    function alert(message, success) {
        vm.message = message;
        vm.alertMode = (success) ? 'green':'red';
    }

    function closeAlert() {
        vm.message = null;
        vm.alertMode = null;
    }
}