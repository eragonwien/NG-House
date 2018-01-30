angular
	.module('ng-house')
	.filter('houseFilter', function(){
		
		return function(houses, priceInfo) {
			
			var filtered = [];
			var min = priceInfo.min;
			var max = priceInfo.max;
			
			angular.forEach(houses, function(house){

				if((house.Price >= min && (house.Price <= max || max == 0))) {
					filtered.push(house);
					}
			});
			
			return filtered;
		}
	});