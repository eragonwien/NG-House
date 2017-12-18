angular
	.module('ng-house')
	.controller('houseController', function($scope, houseFactory, houseService){

		// Show All Houses
		$scope.houses = houseFactory.query();
		// House Filter

		// Add new House
		$scope.addNewHouse = false;

		$scope.toggleAdding = function(){
			$scope.addNewHouse = !($scope.addNewHouse);
			console.log($scope.addNewHouse);
		};

		$scope.newHouse = {};
		$scope.addHouse = function(){
			if (!$scope.newHouse || $scope.newHouse.length <= 0) {
				return;
			}

			if (!houseService.houseInputIsValid($scope.newHouse)) {
				return;
			}

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
				$scope.newHouse = {};
			});
		};
		// Edit House
		$scope.editHouseEnabled = false;
		$scope.editingHouse = {};

		$scope.enableEditHouse = function(house){
			$scope.editHouseEnabled = true;
			$scope.editingHouse = house;
		};

		$scope.saveChanges = function(){
			if (!houseService.houseInputIsValid($scope.editingHouse)) {
				return;
			}
			var houseId = $scope.editingHouse.ID;
			houseFactory.update({id: $scope.editingHouse.ID}, $scope.editingHouse);
			$scope.editingHouse = {};
			$scope.editHouseEnabled = false;
		};

		// Delete House
		$scope.deleteHouse = function(house){
			// Remove from database
			houseFactory.remove({id: house.ID}, function(){
				// Remove from page
				var index = $scope.houses.indexOf(house);
				$scope.houses.splice(index, 1);
			})
		};

		// Filter Houses
		var min = 0, max = -1;

		$scope.resetFilter = function(){
			$scope.priceInfo = {
				min: min,
				max: max
			}
		};
		$scope.resetFilter();


	});