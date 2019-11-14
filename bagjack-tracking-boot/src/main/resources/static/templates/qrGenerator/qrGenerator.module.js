(function() {
	'use strict';
	angular.module('myApp.qrGenerator', ['datatables'])
	.config(function($stateProvider) {
		$stateProvider.state('main.qrGenerator', {
//			abstract : true,
			url : "/qrGenerator",
			views : {
				"sub" : {
					templateUrl: 'templates/qrGenerator/qrGenerator.html',
					controller : "qrGeneratorController as vm"
				}
			}
		})
	});
})();