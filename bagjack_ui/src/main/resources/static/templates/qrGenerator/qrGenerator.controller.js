/**
 * @author 		: Anurag
 * @name			: qrGeneratorController
 * @description 	: controller for QRGeneration module
 * @date 			: 11/08/2019
 */
(function () {
	'use strict';

	angular.module('myApp.qrGenerator').controller('qrGeneratorController', qrGeneratorController);
	qrGeneratorController.$inject = ['$state', '$scope', 'toastr', 'genericFactory', '$http']; //,'DTColumnDefBuilder'


	/* @ngInject */
	function qrGeneratorController($state, $scope, toastr, genericFactory, $http) { //, DTColumnDefBuilder
		var categoryLink = staticUrl + '/category';
		$scope.showArtists = false;
		$scope.showModelCodes = false;
		$scope.showSizes = false;
		$scope.showGenders = false;
		$scope.showColors = false;
		$scope.showQuantity = false;

		$scope.selectedVendor = {};
		$scope.qrCodeArr = [];
		$scope.printButton = true;
		$scope.finalArr = [];

		var vm = angular.extend(this, {
			selectAllChk: false,
			checks: false,
			uploadCategoryExcel: uploadCategoryExcel
		});


		/**
		 * @author : Anurag
		 * @Description : fetch Product Types
		 * @date : 11/11/2019
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
		 * @Description : fetch Artists on product select
		 * @date : 11/11/2019
		 */
		$scope.fetchArtists = function (productName) {
			if($scope.selectedArtist == ''){
				$scope.showModelCodes = false;
				$scope.showSizes = false;
			}
			$scope.selectedModelCode = '';
			$scope.selectedSize = '';
			$scope.selectedGender = '';
			$scope.selectedColor = '';
			$scope.quantity = '';
			var msg = "Artists Load....', 'Successful !!";
			var url = categoryLink + "/getArtists?productType=" + productName;
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.artists = response.data;
				$scope.showArtists = true;
				$scope.showModelCodes = false;
				$scope.showSizes = false;
				$scope.showGenders = false;
				$scope.showColors = false;
				$scope.showQuantity = false;
			});
		}

		/**
		 * @author : Anurag
		 * @Description : fetch code or size on artist select
		 * @date : 11/11/2019
		 */
		$scope.fetchCodeOrSize = function (artist) {
			$scope.selectedGender = '';
			$scope.selectedColor = '';
			$scope.quantity = '';
			var msg = "";
			var url = "";
			if ($scope.selectedProduct == $scope.productTypes[1]) {
				msg = "Sizes Load....', 'Successful !!";
				url = categoryLink + "/getSizes?artist=" + artist + "&productType=" + $scope.selectedProduct;
				genericFactory.getAll(msg, url).then(function (response) {
					$scope.sizes = response.data;
					$scope.showArtists = true;
					$scope.showModelCodes = false;
					$scope.showSizes = true;
					$scope.showGenders = false;
					$scope.showColors = false;
					$scope.showQuantity = false;
				});
			} else {
				msg = "Model Code Load....', 'Successful !!";
				url = categoryLink + "/getModelCodes?artist=" + artist + "&productType=" + $scope.selectedProduct;
				genericFactory.getAll(msg, url).then(function (response) {
					$scope.modelCodes = response.data;
					$scope.showArtists = true;
					$scope.showModelCodes = true;
					$scope.showSizes = false;
					$scope.showGenders = false;
					$scope.showColors = false;
					$scope.showQuantity = false;
				});
			}
		}

		/**
		 * @author : Anurag
		 * @Description : fetch gender
		 * @date : 11/11/2019
		 */
		$scope.fetchGender = function (size) {
			$scope.selectedColor = '';
			$scope.quantity = '';
			var msg = "Model Code Load....', 'Successful !!";
			var url = categoryLink + "/getGenders?artist=" + $scope.selectedArtist + "&productType=" + $scope.selectedProduct + "&size=" + size;
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.genders = response.data;
				$scope.showArtists = true;
				$scope.showModelCodes = false;
				$scope.showSizes = true;
				$scope.showGenders = true;
				$scope.showColors = false;
				$scope.showQuantity = false;
			});
		}

		/**
		 * @author : Anurag
		 * @Description : fetch color by gender
		 * @date : 11/11/2019
		 */
		$scope.fetchColorByGender = function (gender) {
			$scope.quantity = '';
			$scope.colors = [];
			var msg = "Model Code Load....', 'Successful !!";
			var url = categoryLink + "/getColorsByGender?artist=" + $scope.selectedArtist + "&productType=" + $scope.selectedProduct + "&size=" + $scope.selectedSize + "&gender=" + gender;
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.colors = response.data;
				$scope.showArtists = true;
				$scope.showModelCodes = false;
				$scope.showSizes = true;
				$scope.showGenders = true;
				$scope.showColors = true;
				$scope.showQuantity = false;
			});
		}

		/**
		 * @author : Anurag
		 * @Description : fetch color by code or enter quantity
		 * @date : 11/11/2019
		 */
		$scope.fetchColorByCode = function (modelCode) {
			$scope.quantity = '';
			$scope.colors = [];
			var msg = "";
			var url = "";
			if ($scope.selectedProduct == $scope.productTypes[3]) {
				msg = "colors Load....', 'Successful !!";
				url = categoryLink + "/getColorsByCode?artist=" + $scope.selectedArtist + "&productType=" + $scope.selectedProduct + "&modelCode=" + modelCode;
				genericFactory.getAll(msg, url).then(function (response) {
					$scope.colors = response.data;
					$scope.showArtists = true;
					$scope.showModelCodes = true;
					$scope.showSizes = false;
					$scope.showGenders = false;
					$scope.showColors = true;
					$scope.showQuantity = false;
				});
			} else {				
				$scope.quantity = '';
				$scope.showQuantity = true;
			}
		}

		/**
		 * @author : Anurag
		 * @Description : enter quantity or enter quantity
		 * @date : 11/11/2019
		 */
		$scope.activateQuantity = function () {
			$scope.quantity = '';
			$scope.showQuantity = true;
		}



		/**
		 * @author : Anurag
		 * @Description : Upload Excel file for Categories
		 * @date : 11/11/2019
		 */
		function uploadCategoryExcel() {
			var file = document.getElementById('fileAsset').files[0];
			console.log('File is: ')
			console.dir(file);

			if (file == undefined) {
				toastr.error('Please Select an Excel File');
				return;
			}

			var fileName = file.name;
			var extension = ".xlsx";

			if (!fileName.includes(extension)) {
				toastr.error('Selected File is not an Excel');
				return;
			}

			$('.loading').show();
			var fd = new FormData();
			fd.append('file', file);
			var uploadUrl = categoryLink + "/uploadCategories";
			$http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				})
				.then(function successCallback(response) {
					console.log("helooo");
					$('.loading').hide();
					window.alert("File uploaded successfully!");
					init();
					toastr.success('Uploaded....', 'Succesful !!', {
						timeOut: 10000
					});
				}, function errorCallback(response) {
					$('.loading').hide();
					window.alert("File upload - unsuccessfull!");
					init();
					toastr.error('Upload....', 'UnSuccesful !!');
				});

			angular.element("input[type='file']").val(null);
		}

		/**
		 * @author : ABS
		 * @description : to generate QR code
		 * @date : 19/06/2018
		 */
		$scope.makeCode = function () {
			if($scope.selectedProduct == ''){
				return
			}
			if($scope.selectedProduct == 'FC')
				if($scope.selectedModelCode == undefined || $scope.selectedArtist == undefined){
					toastr.error("Please select all fields")
					return;
				}

			if($scope.selectedProduct == 'Jacket')
				if($scope.selectedArtist == undefined || $scope.selectedSize == undefined || $scope.selectedGender == undefined || $scope.selectedColor == undefined){
					toastr.error("Please select all fields")
					return;
				}

			if($scope.selectedProduct == 'LD')
				if($scope.selectedModelCode == undefined || $scope.selectedArtist == undefined){
					toastr.error("Please select all fields")
					return;
				}

			if($scope.selectedProduct == 'LG')
				if($scope.selectedModelCode == undefined || $scope.selectedArtist == undefined || $scope.selectedColor == undefined){
					toastr.error("Please select all fields")
					return;
				}

			if($scope.selectedProduct == 'Sling')
				if($scope.selectedModelCode == undefined || $scope.selectedArtist == undefined){
					toastr.error("Please select all fields")
					return;
				}

			console.log($scope.selectedProduct + " " + $scope.selectedArtist + " " + $scope.selectedSize + " " + $scope.selectedGender + " " + $scope.selectedModelCode + " " + $scope.selectedColor)
				console.log("Check" + $scope.selectedSize)



			// $scope.disableQrCodeButton = true;
			// $scope.qrCodeArr = [];
			// var sArr = [];
			// var copiesArr = [];
			// $scope.copiesArr = [];
			// $scope.qrArrAll = [];

			// for (var i = 0; i < $scope.finalArr.length; i++) {
			// 	var qrDiv = document.getElementById("qr" + i); // to remove all generated QR code from div
			// 	while (qrDiv.firstChild) {
			// 		qrDiv.removeChild(qrDiv.firstChild);
			// 	}
			// }

			// $scope.finalArr = [];
			// var qrDiv = document.getElementById("QR");

			// for (var index in $scope.allDetails) {
			// 	if ($scope.allDetails[index].printQty == true) {
			// 		$scope.qrCodeArr.push($scope.allDetails[index]);
			// 		var val = parseInt($scope.allDetails[index].printCopies);
			// 		if (isNaN(val) || val < 1) {
			// 			$scope.printButton = true;
			// 			toastr.error('Please enter proper number to print copies.');
			// 			document.getElementById('print' + index).focus();
			// 			return;
			// 		}
			// 		//  copiesArr.push(val);
			// 		$scope.allDetails[index].isQrGenerated = true;
			// 		$scope.copiesArr.push(val);
			// 		for (var i = 0; i < val; i++) {
			// 			var iObj = Object.assign({}, $scope.allDetails[index]);
			// 			iObj.amt = i + 1;
			// 			if (i > 0) {
			// 				iObj.copy = true;
			// 			}
			// 			$scope.qrArrAll.push(iObj);
			// 		}
			// 	}
			// }
			// console.log(JSON.stringify($scope.qrArrAll));
			// $scope.finalArr = $scope.qrArrAll;
			// console.log(JSON.stringify($scope.finalArr));
			// if (!$scope.qrCodeArr || $scope.qrCodeArr.length == 0) {
			// 	toastr.error('Please select checkbox');
			// 	return;
			// }


			// setTimeout(function () {
			// 	var arr = [];
			// 	console.log(JSON.stringify($scope.finalArr));
			// 	for (var i in $scope.finalArr) {
			// 		var day = new Date($scope.finalArr[i].grnEntryDate).getDate();
			// 		var month = new Date($scope.finalArr[i].grnEntryDate).getMonth();
			// 		month = parseInt(month) + 1;
			// 		var year = new Date($scope.finalArr[i].grnEntryDate).getFullYear();

			// 		var qrCodeStr = '001//' + $scope.finalArr[i].grnId + '//' + $scope.finalArr[i].grnNo + '//' + $scope.finalArr[i].itemMstId + '//' + day + '-' + month + '-' + year; //$scope.qrCodeArr[i].venPostDate;
			// 		qrCodeStr = qrCodeStr.replace(/\s/g, '');
			// 		var e = document.getElementById('qr' + i);
			// 		generateQRCode('qr' + i, qrCodeStr);



			// 		if (!$scope.finalArr[i].barcode || $scope.finalArr[i].barcode == '' || $scope.finalArr[i].barcode == null) {
			// 			if (arr.indexOf($scope.finalArr[i].grnItmLotID) == -1) {
			// 				arr.push($scope.finalArr[i].grnItmLotID);
			// 				var msg = "QR code submitted....', 'Successfully !!";
			// 				var url = grn + "/updateQr?grItmlotId=" + $scope.finalArr[i].grnItmLotID + " &qrCodeNo=" + qrCodeStr;
			// 				genericFactory.getAll(msg, url).then(function (response) {

			// 				});
			// 			}
			// 		}
			// 	}
			// }, 0);



			// if ($scope.qrCodeArr && $scope.qrCodeArr.length > 0)
			// 	$scope.printButton = false;
			// else
			// 	$scope.printButton = true;

			// setTimeout(function () {
			// 	window.scroll({
			// 		top: document.body.scrollHeight,
			// 		left: 0,
			// 		behavior: 'smooth'
			// 	});
			// }, 10);
		}

		/**
		 * @author : ABS
		 * @description : to generate QR code
		 * @date : 19/06/2018
		 */
		var generateQRCode = function (divId, s) {
			var qrcode = new QRCode(document.getElementById(divId), {
				width: 100,
				height: 100
			});
			qrcode.makeCode(s);
		}

		/**
		 * @author : ABS
		 * @description : to print QR code
		 * @date : 19/06/2018
		 */
		$scope.printCode = function () {
			var innerContents = document.getElementById('QR').innerHTML;
			var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.open();
			popupWinindow.document.write('<style> @page {  margin: 8;} </style>');
			// popupWinindow.document.write('<html><head><style>.ng-hide { display: none !important; }</style></head><body onload="window.print()">' + innerContents + '</html>');
			popupWinindow.document.write('<html><body onload="window.print()">' + innerContents + '</html>');
			popupWinindow.document.close();
		}

		/**
		 * @author : Anurag
		 * @Description : init controller
		 * @date : 11/11/2019
		 */
		var init = function () {
			$scope.fetchProductType();
		}

		init();

	}
})();
