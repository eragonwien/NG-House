angular
	.module('ng-house')
	.filter('houseFilter', function(){
		
		return function(houses, priceInfo) {
			
			var filtered = [];
			var min = priceInfo.min;
			var max = priceInfo.max;
			
			angular.forEach(houses, function(house){

				if(max == -1 || (house.Price >= min && house.Price <= max)) {
					filtered.push(house);
				}
			});
			
			return filtered;
		}
	});