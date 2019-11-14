/**
 * @author : Anurag
 * @name : salesController
 * @description : controller for Sales
 * @date : 13/11/2019
 */

(function () {
	"use strict";

	angular
		.module("myApp.sales")
		.controller("salesController", salesController)


	salesController.$inject = [
		"$scope",
		"toastr",
		"DTColumnDefBuilder",
		"DTOptionsBuilder",
		"genericFactory",
		"localStorageService",
		"ApiEndpoint",
	];

	/* @ngInject */
	function salesController(
		$scope,
		toastr,
		DTColumnDefBuilder,
		DTOptionsBuilder,
		genericFactory,
		localStorageService,
		ApiEndpoint,
	) {
		var vm = angular.extend(this, {

		});

		(function activate() {

		})();

		var loginUser = localStorageService.get(ApiEndpoint.userKey);
		var stockLink = staticUrl + "/stock";
		var categoryLink = staticUrl + "/category";
		$scope.isLoading = false;
		$scope.showTable1 = false;
		$scope.showData = false;
		$scope.stocks = [];
		$scope.isSales = false;

		$scope.isLoading2 = false;
		$scope.showTable2 = false;
		$scope.showReturns = false;

		/**
		 * @author : Anurag
		 * @Description : Start processing sales
		 * @date : 13/11/2019
		 */
		$scope.processSales = function () {
			$scope.isSales = true;
			console.log("hello")
			$scope.showData = true;
			$scope.isLoading = false;
			$scope.showTable = false;
			$scope.stocks = [];
		}

		/**
		 * @author : Anurag
		 * @Description : Start processing returns
		 * @date : 13/11/2019
		 */
		$scope.processReturn = function () {
			$scope.isSales = false;
			$scope.showData = true;
			$scope.isLoading = false;
			$scope.showTable = false;
			$scope.stocks = [];
		}

		/**
		 * @author : Anurag
		 * @Description : Fetch item on qrCode scan
		 * @date : 13/11/2019
		 */
		$scope.fetchItemDetails = function (qrCode) {
			if (qrCode == "" || !qrCode) {
				return;
			}
			for (var i in $scope.stocks) {
				if($scope.stocks[i].productCode == qrCode){
					$scope.qrCode = "";
					toastr.error("Already scanned and added");
					return;
				}
			}
			
			$scope.showData = true;
			$scope.isLoading = true;
			$scope.showTable = false;
			if($scope.isSales){
				var msg = "Stock for selected qrCode load....', 'Successful !!";
				var url = stockLink + "/getStockByQrCode?qrCode=" + qrCode;
				genericFactory.getAll(msg, url).then(function (response) {
					var resObj = response.data;
					console.log(JSON.stringify(resObj));
					if (resObj)
						$scope.stocks.push(resObj);
					else
						toastr.error("Invalid QRCode")
					console.log(JSON.stringify($scope.stocks));

					if($scope.stocks.length==0){
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = false;
					}else{
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = true;
					}
					$scope.qrCode = "";
				});
			} else {
				console.log("hello")
				var msg = "Stock for returned qrCode load....', 'Successful !!";
				var url = stockLink + "/getStockByRetQrCode?retQrCode=" + qrCode;
				genericFactory.getAll(msg, url).then(function (response) {
					var resObj = response.data;
					console.log(JSON.stringify(resObj));
					if (resObj)
						$scope.stocks.push(resObj);
						else
						toastr.error("Invalid QRCode")
					console.log(JSON.stringify($scope.stocks));

					if($scope.stocks.length==0){
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = false;
					}else{
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = true;
					}
					$scope.qrCode = "";
			});
			}
		}

		/**
		 * @author : Anurag
		 * @Description : Fetch item by serial no.
		 * @date : 13/11/2019
		 */
		$scope.fetchBySerialNo = function(serialNo) {
			if (serialNo == "" || !serialNo) {
				toastr.error("Please Enter a Serial No.");
				return;
			}
			for (var i in $scope.stocks) {
				if($scope.stocks[i].serialCode == serialNo){
					$scope.serialNo = "";
					toastr.error("Already added");
					return;
				}
			}
			$scope.showData = true;
			$scope.isLoading = true;
			$scope.showTable = false;
			var msg = "Stock for selected serial number....', 'Successful !!";
				var url = stockLink + "/getStockBySerial?serialNo=" + serialNo;
				genericFactory.getAll(msg, url).then(function (response) {
					var resObj = response.data;
					console.log(JSON.stringify(resObj));
					if (resObj)
						$scope.stocks.push(resObj);
					else
						toastr.error("Invalid Serial No.")
					console.log(JSON.stringify($scope.stocks));

					if($scope.stocks.length==0){
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = false;
					}else{
						$scope.showData = true;
						$scope.isLoading = false;
						$scope.showTable = true;
					}
					$scope.serialNo = "";
				});
		}

		/**
		 * @author : Anurag
		 * @Description : Fetch item on qrCode scan
		 * @date : 13/11/2019
		 */
		$scope.removeItem = function(ind) {
			$scope.stocks.splice(ind, 1);
			if($scope.stocks.length==0){
				$scope.showData = true;
				$scope.isLoading = false;
				$scope.showTable = false;
			}
		}

		/**
		 * @author : Anurag
		 * @Description : Sell Items
		 * @date : 13/11/2019
		 */
		$scope.sellItems = function() {
			if($scope.stocks.length==0){
				return;
			}
			var msg = "Selling Items";
			var url = stockLink + "/sellItems";
			console.log(JSON.stringify($scope.stocks));
			for(var i in $scope.stocks){
				$scope.stocks[i].saleUserId = loginUser.id;
				$scope.stocks[i].saleDate = new Date();
			}
			genericFactory.add(msg, url, $scope.stocks).then(function (response) {
				$scope.isLoading = false;
				$scope.showTable = false;
				$scope.showData = true;
				$scope.stocks = [];
			});
		}

		/**
		 * @author : Anurag
		 * @Description : Restock returned item
		 * @date : 13/11/2019
		 */
		$scope.reStockItems = function(){
			if($scope.stocks.length==0){
				return;
			}
			var msg = "Restocking Returned Items";
			var url = stockLink + "/reStockItems";
			console.log(JSON.stringify($scope.stocks));
			for(var i in $scope.stocks){
				$scope.stocks[i].returnUserId = loginUser.id;
				$scope.stocks[i].returnDate = new Date();
			}
			genericFactory.add(msg, url, $scope.stocks).then(function (response) {
				$scope.isLoading = false;
				$scope.showTable = false;
				$scope.showData = true;
				$scope.stocks = [];
			});
		}

		/**
		 * @author : Anurag
		 * @Description : init controller
		 * @date : 18/06/2018
		 */
		var init = function () {
			$scope.dtOptions = DTOptionsBuilder.newOptions().withDOM(
				'C<"clear">lfrtip'
			);
			$scope.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(3).notSortable(),
				DTColumnDefBuilder.newColumnDef(3).notSortable()
			];
		};

		init();


	}
})();
