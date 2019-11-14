(function() {
	'use strict';
	angular.module('myApp.reports', ['datatables'])
	.config(function($stateProvider) {
		$stateProvider.state('main.stocksReport', {
			url : "/stocksReport",
			views : {
				"sub" : {
					templateUrl: 'templates/reports/stocksReport.html',
					controller : "stocksReportController as vm"
				}
			}
		})
		.state('main.salesReport', {
			url : "/salesReport",
			views : {
				"sub" : {
					templateUrl: 'templates/reports/salesReport.html',
					controller : "salesReportController as vm"
				}
			}
		})
		.state('main.returnReport', {
			url : "/returnReport",
			views : {
				"sub" : {
					templateUrl: 'templates/reports/returnReport.html',
					controller : "returnReportController as vm"
				}
			}
		})
	});
})();