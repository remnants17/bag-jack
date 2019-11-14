/**
 * @author : Anurag
 * @name : reportsController
 * @description : controller for reports
 * @date : 14/11/2019
 */
(function() {
	'use strict';

	angular.module('myApp.reports').controller('stocksReportController', stocksReportController)
									.controller('salesReportController', salesReportController)
									.controller('returnReportController', returnReportController);
	
	stocksReportController.$inject = [ '$state', '$scope', 'toastr', 'genericFactory', '$filter'];
	salesReportController.$inject = [ '$state', '$scope', 'toastr', 'genericFactory', '$filter'];
	returnReportController.$inject = [ '$state', '$scope', 'toastr', 'genericFactory', '$filter'];	
	
	function stocksReportController($state, $scope, toastr, genericFactory, $filter) {
		var reportUrl = staticUrl + '/report';

		var vm = angular.extend(this, {
			reportsList : [],
			labels : {},
			generateReport : generateReport,
			generateReportByDateRange : generateReportByDateRange			
		});

		(function activate() {
			generateReport();			
			vm.labels={
					'productType': 'Product',
					'serialCode': 'Serial No.',
					'artist': 'Artist',
					'modelCode': 'Model Code',
					'size': 'size',
					'gender':'gender',
					'color': 'color',
					'stockDate': "Stock Date",
					'isSold': "Status"
					};
		})();		

		/**
		 * @author : Anurag
		 * @description : get report
		 * @date : 17/07/2018
		 */
		function generateReport() {
			if (!$scope.date) {
				vm.reportsList = [];
				return;
			}

			$scope.fromDate = null;
			$scope.toDate = null;

			var fDateDay = $scope.date.getDate() < 10 ? '0'
					+ ($scope.date.getDate()) : ($scope.date.getDate());
			var fDateMonth = ($scope.date.getMonth() + 1) < 10 ? '0'
					+ ($scope.date.getMonth() + 1)
					: ($scope.date.getMonth() + 1);

			var date = $scope.date.getFullYear() + '-' + fDateMonth + '-'
					+ fDateDay;
			
			var msg = "Getting data from Date";
			var url = reportUrl + "/todaysStock?date="+date;
			genericFactory.getAll(msg, url).then(function(response) {				
				vm.reportsList = response.data;				
				console.log(JSON.stringify(vm.reportsList));
				for (var index in vm.reportsList){
					vm.reportsList[index].stockDate = $filter('date')(vm.reportsList[index].stockDate,"dd/MM/yyyy");
					if(vm.reportsList[index].isSold == 'N'){
						vm.reportsList[index].isSold = "In Stock";
					}else if(vm.reportsList[index].isSold == 'S'){
						vm.reportsList[index].isSold = "Sold";
					}else{
						vm.reportsList[index].isSold = "Returned";
					}
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}
			});
		}

		/**
		 * @author : Anurag
		 * @description : get report from range date
		 * @date : 17/07/2018
		 */
		function generateReportByDateRange() {
			if ($scope.fromDate == null || $scope.toDate == null) {
				return;
			}
			
			if ($scope.fromDate > $scope.toDate) {
				toastr.error('start date can not be greater than end date');
				return;
			}
			
			$scope.date = null;

			var fDateDay = $scope.fromDate.getDate() < 10 ? '0'
					+ ($scope.fromDate.getDate()) : ($scope.fromDate.getDate());
			var fDateMonth = ($scope.fromDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.fromDate.getMonth() + 1) : ($scope.fromDate
					.getMonth() + 1);
			var tDateDay = ($scope.toDate.getDate()) < 10 ? '0'
					+ ($scope.toDate.getDate()) : ($scope.toDate.getDate());
			var tDateMonth = ($scope.toDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.toDate.getMonth() + 1) : ($scope.toDate
					.getMonth() + 1);

			var startDate = $scope.fromDate.getFullYear() + '-' + fDateMonth + '-' + fDateDay;
			var	endDate = $scope.toDate.getFullYear() + '-' + tDateMonth + '-' + tDateDay;

			var msg = "Getting data from Date Range";
			var url = reportUrl + "/stockByDateRange?startDate="+startDate+"&endDate="+endDate;
			genericFactory.getAll(msg, url).then(function(response) {
				vm.reportsList = response.data;
				for (var index in vm.reportsList){
					vm.reportsList[index].stockDate = $filter('date')(vm.reportsList[index].stockDate,"dd/MM/yyyy");
					if(vm.reportsList[index].isSold == 'N'){
						vm.reportsList[index].isSold = "In Stock";
					}else if(vm.reportsList[index].isSold == 'S'){
						vm.reportsList[index].isSold = "Sold";
					}else{
						vm.reportsList[index].isSold = "Returned";
					}
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}
			});
		}		
	}
	
	
	function salesReportController($state, $scope, toastr, genericFactory, $filter) {
		var reportUrl = staticUrl + '/report';

		var vm = angular.extend(this, {
			reportsList : [],
			labels : {},
			generateReport : generateReport,
			generateReportByDateRange : generateReportByDateRange			
		});

		(function activate() {
			generateReport();			
			vm.labels={
				'productType': 'Product',
				'serialCode': 'Serial No.',
				'artist': 'Artist',
				'modelCode': 'Model Code',
				'size': 'size',
				'gender':'gender',
				'color': 'color',
				'saleDate': "Sold Date",
				'isSold': "Status"
				};
		})();		

		/**
		 * @author : Anurag
		 * @description : get report
		 * @date : 17/07/2018
		 */
		function generateReport() {
			if (!$scope.date) {
				vm.reportsList = [];
				return;
			}

			$scope.fromDate = null;
			$scope.toDate = null;

			var fDateDay = $scope.date.getDate() < 10 ? '0'
					+ ($scope.date.getDate()) : ($scope.date.getDate());
			var fDateMonth = ($scope.date.getMonth() + 1) < 10 ? '0'
					+ ($scope.date.getMonth() + 1)
					: ($scope.date.getMonth() + 1);

			var date = $scope.date.getFullYear() + '-' + fDateMonth + '-'
					+ fDateDay;
			
			var msg = "Getting data from Date";
			var url = reportUrl + "/todaysSales?date="+date;
			genericFactory.getAll(msg, url).then(function(response) {				
				vm.reportsList = response.data;
				for (var index in vm.reportsList){
					vm.reportsList[index].saleDate = $filter('date')(vm.reportsList[index].saleDate,"dd/MM/yyyy");
					if(vm.reportsList[index].isSold == 'S'){
						vm.reportsList[index].isSold = "Sold";
					}else{
						vm.reportsList[index].isSold = "Returned";
					}
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}
			});
		}

		/**
		 * @author : Anurag
		 * @description : get report from range date
		 * @date : 17/07/2018
		 */
		function generateReportByDateRange() {
			if ($scope.fromDate == null || $scope.toDate == null) {
				return;
			}
			
			if ($scope.fromDate > $scope.toDate) {
				toastr.error('start date can not be greater than end date');
				return;
			}
			
			$scope.date = null;

			var fDateDay = $scope.fromDate.getDate() < 10 ? '0'
					+ ($scope.fromDate.getDate()) : ($scope.fromDate.getDate());
			var fDateMonth = ($scope.fromDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.fromDate.getMonth() + 1) : ($scope.fromDate
					.getMonth() + 1);
			var tDateDay = ($scope.toDate.getDate()) < 10 ? '0'
					+ ($scope.toDate.getDate()) : ($scope.toDate.getDate());
			var tDateMonth = ($scope.toDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.toDate.getMonth() + 1) : ($scope.toDate
					.getMonth() + 1);

			var startDate = $scope.fromDate.getFullYear() + '-' + fDateMonth + '-' + fDateDay;
			var	endDate = $scope.toDate.getFullYear() + '-' + tDateMonth + '-' + tDateDay;

			var msg = "Getting data from Date Range";
			var url = reportUrl + "/salesByDateRange?startDate="+startDate+"&endDate="+endDate;
			genericFactory.getAll(msg, url).then(function(response) {
				vm.reportsList = response.data;
				for (var index in vm.reportsList){
					vm.reportsList[index].saleDate = $filter('date')(vm.reportsList[index].saleDate,"dd/MM/yyyy");
					if(vm.reportsList[index].isSold == 'S'){
						vm.reportsList[index].isSold = "Sold";
					}else{
						vm.reportsList[index].isSold = "Returned";
					}
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}
			});
		}		
	}
	
	function returnReportController($state, $scope, toastr, genericFactory, $filter) {
		var reportUrl = staticUrl + '/report';

		var vm = angular.extend(this, {
			reportsList : [],
			labels : {},
			generateReport : generateReport,
			generateReportByDateRange : generateReportByDateRange			
		});

		(function activate() {
			generateReport();			
			vm.labels={
				'productType': 'Product',
				'serialCode': 'Serial No.',
				'artist': 'Artist',
				'modelCode': 'Model Code',
				'size': 'size',
				'gender':'gender',
				'color': 'color',
				'returnDate': "Returned Date"
				};
		})();		

		/**
		 * @author : Anurag
		 * @description : get report
		 * @date : 17/07/2018
		 */
		function generateReport() {
			if (!$scope.date) {
				vm.reportsList = [];
				return;
			}

			$scope.fromDate = null;
			$scope.toDate = null;

			var fDateDay = $scope.date.getDate() < 10 ? '0'
					+ ($scope.date.getDate()) : ($scope.date.getDate());
			var fDateMonth = ($scope.date.getMonth() + 1) < 10 ? '0'
					+ ($scope.date.getMonth() + 1)
					: ($scope.date.getMonth() + 1);

			var date = $scope.date.getFullYear() + '-' + fDateMonth + '-'
					+ fDateDay;
			
			var msg = "Getting data from Date";
			var url = reportUrl + "/todaysReturn?date="+date;
			genericFactory.getAll(msg, url).then(function(response) {				
				vm.reportsList = response.data;				
				for (var index in vm.reportsList){
					vm.reportsList[index].returnDate = $filter('date')(vm.reportsList[index].returnDate,"dd/MM/yyyy");
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}			
			});
		}

		/**
		 * @author : Anurag
		 * @description : get report from range date
		 * @date : 17/07/2018
		 */
		function generateReportByDateRange() {
			if ($scope.fromDate == null || $scope.toDate == null) {
				return;
			}
			
			if ($scope.fromDate > $scope.toDate) {
				toastr.error('start date can not be greater than end date');
				return;
			}
			
			$scope.date = null;

			var fDateDay = $scope.fromDate.getDate() < 10 ? '0'
					+ ($scope.fromDate.getDate()) : ($scope.fromDate.getDate());
			var fDateMonth = ($scope.fromDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.fromDate.getMonth() + 1) : ($scope.fromDate
					.getMonth() + 1);
			var tDateDay = ($scope.toDate.getDate()) < 10 ? '0'
					+ ($scope.toDate.getDate()) : ($scope.toDate.getDate());
			var tDateMonth = ($scope.toDate.getMonth() + 1) < 10 ? '0'
					+ ($scope.toDate.getMonth() + 1) : ($scope.toDate
					.getMonth() + 1);

			var startDate = $scope.fromDate.getFullYear() + '-' + fDateMonth + '-' + fDateDay;
			var	endDate = $scope.toDate.getFullYear() + '-' + tDateMonth + '-' + tDateDay;

			var msg = "Getting data from Date Range";
			var url = reportUrl + "/returnByDateRange?startDate="+startDate+"&endDate="+endDate;
			genericFactory.getAll(msg, url).then(function(response) {
				vm.reportsList = response.data;
				for (var index in vm.reportsList){
					vm.reportsList[index].returnDate = $filter('date')(vm.reportsList[index].returnDate,"dd/MM/yyyy");
					vm.reportsList[index].serialCode = "#"+vm.reportsList[index].serialCode;
				}
			});
		}		
	}

})();