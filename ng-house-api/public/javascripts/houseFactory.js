angular
	.module('ng-house')
	.factory('houseFactory', function($resource){	
		return $resource('/ng-house/houses/:id', {}, {
				'update': {method: 'PUT', params: {id: '@id'}}
			});
	});