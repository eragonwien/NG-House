angular
	.module('ng-house')
	.controller('houseController', function($scope, houseFactory){

		$scope.houses = houseFactory.query();
	});