angular
	.module('ng-house')
	.service('houseService', function(){	
		this.houseInputIsValid = function(house){
			if (houseIsEmpty(house)) {
				return false;
			}
			return true;
		}

		function houseIsEmpty(house) {
			console.log(house);
			for (var key in house) {
				if (house.hasOwnProperty(key)) {
					return false;
				}
			}
			return true;
		}
	});