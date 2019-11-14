(function() {
	'use strict';
	angular.module('myApp.sales', ['datatables'])
	.config(function($stateProvider) {
		$stateProvider.state('main.sales', {
//			abstract : true,
			url : "/sales",
			views : {
				"sub" : {
					templateUrl: 'templates/sales/sales.html',
					controller : "salesController as vm"
				}
			}
		})
	});
})();