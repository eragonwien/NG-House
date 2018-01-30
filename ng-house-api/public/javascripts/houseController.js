angular
	.module('ng-house')
	.controller('houseController', function($scope, houseFactory, houseService){

		// Show All Houses
		$scope.houses = houseFactory.query();
		
		$scope.test = function(){
			var type = null;
			var bath = 3
			$scope.houses = houseFactory.query({'Type': type, 'Bathrooms': bath});
		}
		// House Filter

		// Add new House
		$scope.addNewHouse = false;

		$scope.toggleAdding = function(){
			$scope.addNewHouse = !($scope.addNewHouse);
		};

		$scope.newHouse = {};
		$scope.addHouse = function(){

			if (houseService.houseInputIsValid($scope.newHouse)) {
				saveHouse();
				$scope.setAlert(false, $scope.newHouse.Type + " " + $scope.newHouse.ID + " added.");
			}
			else {
				console.log("Invalid Input. Adding aborted !");
				$scope.setAlert(true, "Invalid Input. Adding aborted !");
			}

			$scope.newHouse = {};
			$scope.addNewHouse = false;
		};

		function saveHouse() {
			if (typeof $scope.newHouse.Image === 'undefined') {
				$scope.newHouse.Image = 'default.jpg';
			}

			var houseResource = new houseFactory({
				Price: $scope.newHouse.Price, 
				Type: $scope.newHouse.Type, 
				Address: $scope.newHouse.Address, 
				Description: $scope.newHouse.Description, 
				Bathrooms: $scope.newHouse.Bathrooms, 
				Bedrooms: $scope.newHouse.Bedrooms,
				Area: $scope.newHouse.Area
			});

			houseResource.$save(function(){
				$scope.houses.push($scope.newHouse);
			});
		}

		// Edit House
		$scope.editHouseEnabled = false;
		$scope.editingHouse = {};

		$scope.enableEditHouse = function(house){
			$scope.editHouseEnabled = true;
			$scope.editingHouse = house;
		};

		$scope.saveChanges = function(house){
			if (houseService.houseInputIsValid(house)) {
				updateHouse(house);
				$scope.setAlert(false, house.Type + " " + house.ID + " updated.");
			}
			else {
				console.log("Invalid Input. House is not updated.")
				$scope.setAlert(true, "Invalid Input. Adding aborted !");
			}
		};

		function updateHouse(house) {
			var houseId = house.ID;
			houseFactory.update({id: house.ID}, house);
		}
		// Delete House
		$scope.deleteHouse = function(house){
			// Remove from database
			houseFactory.remove({id: house.ID}, function(){
				// Remove from page
				var index = $scope.houses.indexOf(house);
				$scope.houses.splice(index, 1);
				$scope.setAlert(false, house.Type + " " + house.ID + " removed.");
			})
		};

		// Filter Houses
		var min = 0, max = 0;

		$scope.resetFilter = function(){
			$scope.priceInfo = {
				min: min,
				max: max
			};
		};

		$scope.resetFilter();

		// Notification Alert
		$scope.alertMessage = "";
		$scope.alertOn = false;
		$scope.alertClass = "alert-info";

		$scope.setAlert = function(warning, content) {
			if (warning) {
				$scope.alertClass = "alert-danger";
			}
			else {
				$scope.alertClass = "alert-success";
			}

			$scope.alertMessage = content;
			$scope.alertOn = true;
		};
	});