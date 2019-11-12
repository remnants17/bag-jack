/**
 * @author : Anurag
 * @name : storageBinController
 * @description : controller for Storage Bin module
 * @date : 18/06/2019
 */

(function () {
	"use strict";

	angular
		.module("myApp.storageBin")
		.controller("storageBinController", storageBinController)
		

	storageBinController.$inject = [
		"$scope",
		"toastr",
		"DTColumnDefBuilder",
		"DTOptionsBuilder",
		"genericFactory",
		"localStorageService",
		"ApiEndpoint",
	];	

	/* @ngInject */
	function storageBinController(
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
		$scope.showTable = false;
		$scope.showData = false;

		/**
		 * @author : Anurag
		 * @Description : fetch Product Types
		 * @date : 12/11/2019
		 */
		$scope.fetchProductType = function () {
			var msg = "Products Name Load....', 'Successful !!";
			var url = categoryLink + "/getProductTypes";
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.productTypes = response.data;
			});
		}

		/**
		 * @author : Anurag
		 * @Description : Show Stock for selected item
		 * @date : 12/11/2019
		 */
		$scope.fetchStock = function(selectedProduct){
			$scope.showData = true;
			$scope.isLoading = true;
			var msg = "Stock for selected product load....', 'Successful !!";
			var url = stockLink + "/getStockByProduct?productType="+selectedProduct;
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.stocks = response.data;
				for(var i in $scope.stocks){
					if($scope.stocks[i].modelCode==null)
						$scope.stocks[i].modelCode="NA";
					if($scope.stocks[i].size==0)
						$scope.stocks[i].size="NA";
					if($scope.stocks[i].color==null)
						$scope.stocks[i].color="NA";

					if($scope.stocks[i].gender==null)
						$scope.stocks[i].gender="NA";
					else if($scope.stocks[i].gender=='M')
						$scope.stocks[i].gender="Male";
					else
						$scope.stocks[i].gender="Female";
				}
				$scope.isLoading = false;
				$scope.showTable = true;

				setTimeout(function(){
					window.scroll({
						 top: document.body.scrollHeight, 
						 left: 0, 
						 behavior: 'smooth' 
					   });
				},10);
			});
		}

		/**
		 * @author : Anurag
		 * @Description : Show all Stocks
		 * @date : 12/11/2019
		 */
		$scope.showAllStock = function(selectedProduct){
			$scope.showData = true;
			$scope.isLoading = true;
			var msg = "Stock for all load....', 'Successful !!";
			var url = stockLink + "/getStock";
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.stocks = response.data;
				for(var i in $scope.stocks){
					if($scope.stocks[i].modelCode==null)
						$scope.stocks[i].modelCode="NA";
					if($scope.stocks[i].size==0)
						$scope.stocks[i].size="NA";						
					if($scope.stocks[i].color==null)
						$scope.stocks[i].color="NA";

					if($scope.stocks[i].gender==null)
						$scope.stocks[i].gender="NA";
					else if($scope.stocks[i].gender=='M')
						$scope.stocks[i].gender="Male";
					else
						$scope.stocks[i].gender="Female";
				}
				$scope.isLoading = false;
				$scope.showTable = true;

				setTimeout(function(){
					window.scroll({
						 top: document.body.scrollHeight, 
						 left: 0, 
						 behavior: 'smooth' 
					   });
				},10);
			});
		}

		/**
		 * @author : Anurag
		 * @Description : init controller
		 * @date : 18/06/2018
		 */
		var init = function () {	
			$scope.fetchProductType();		
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
