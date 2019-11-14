/**
 * @author 		: Anurag
 * @name			: qrGeneratorController
 * @description 	: controller for QRGeneration module
 * @date 			: 11/08/2019
 */
(function () {
	'use strict';

	angular.module('myApp.qrGenerator').controller('qrGeneratorController', qrGeneratorController);
	qrGeneratorController.$inject = ['$state', '$scope', 'toastr', 'genericFactory', '$http', 'localStorageService', 'ApiEndpoint']; //,'DTColumnDefBuilder'


	/* @ngInject */
	function qrGeneratorController($state, $scope, toastr, genericFactory, $http, localStorageService, ApiEndpoint) { //, DTColumnDefBuilder
		var loginUser = localStorageService.get(ApiEndpoint.userKey);
		var categoryLink = staticUrl + '/category';
		var stockLink = staticUrl + '/stock';
		$scope.showArtists = false;
		$scope.showModelCodes = false;
		$scope.showSizes = false;
		$scope.showGenders = false;
		$scope.showColors = false;
		$scope.showQuantity = false;
		$scope.showPrintArea = false;
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
		 * @Description : fetch Count
		 * @date : 12/11/2019
		 */
		$scope.fetchCount = function () {
			var msg = "Products registered count load....', 'Successful !!";
			var url = stockLink + "/getProductCount";
			genericFactory.getAll(msg, url).then(function (response) {
				$scope.productCount = response.data;
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
				$scope.showPrintArea = false;
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
					$scope.showPrintArea = false;
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
					$scope.showPrintArea = false;
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
				$scope.showPrintArea = false;
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
				$scope.showPrintArea = false;
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
					$scope.showPrintArea = false;
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
		 * @author : Anurag
		 * @description : to use library and generate QR Code
		 * @date : 12/11/2019
		 */
		var generateQRCode = function (divId, s) {
			var qrcode = new QRCode(document.getElementById(divId), {
				width: 100,
				height: 100
			});
			qrcode.makeCode(s);
		};

		/**
		 * @author : Anurag
		 * @description : Show qrcode on divs after generating code
		 * @date : 12/11/2019
		 */
		$scope.buildCode = function () {			
			$scope.fetchCount();
			var qrCode = "";
			for (var i in $scope.qrCodeArr) {
				var qrDiv1 = document.getElementById("qrPrint" + i);
				if (qrDiv1) {
					while (qrDiv1.firstChild) {
						qrDiv1.removeChild(qrDiv1.firstChild);
					}
				}
			}

			$scope.qrCodeArr = [];
			$scope.finalArr = [];

			if($scope.selectedProduct == '' || $scope.selectedProduct == undefined){
				toastr.error("Please select Product")
				return;
			}

			if($scope.selectedProduct == 'FC' || $scope.selectedProduct == 'LD' || $scope.selectedProduct == 'Sling')
				if(!$scope.selectedModelCode || !$scope.selectedArtist || $scope.selectedModelCode == "" || $scope.selectedArtist == ""){
					toastr.error("Please select all fields")
					return;
				}else{
					qrCode = $scope.selectedProduct.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedArtist.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedModelCode.split('-')[0]+"-"+							
							"na"+"-"+
							"n"+"-"+
							"na";

					for (var i = 0; i < $scope.quantity; i++) {
							var count = ++$scope.productCount;
							var obj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: $scope.selectedModelCode,
								size: "NA",
								gender: "NA",
								color: "NA",
								serialCode: zeroFill(count, 6)
							};
							var finalObj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: $scope.selectedModelCode,
								size: "NA",
								gender: "NA",
								color: "NA",
								productCount: count,
								serialCode: zeroFill(count, 6),
								isSold: 'N',
								stockUserId: loginUser.id,
								stockDate: new Date()
							}
							$scope.qrCodeArr.push(obj);
							$scope.finalArr.push(finalObj);
					}
				}

			if($scope.selectedProduct == 'Jacket')
				if(!$scope.selectedArtist || !$scope.selectedSize || !$scope.selectedGender || !$scope.selectedColor ||
					$scope.selectedArtist == "" || $scope.selectedSize == "" || $scope.selectedGender == "" || $scope.selectedColor == ""){
					toastr.error("Please select all fields")
					return;
				}else{
					qrCode = $scope.selectedProduct.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedArtist.substring(0, 2).toUpperCase()+"-"+
							"na"+"-"+							
							$scope.selectedSize.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedGender+"-"+
							$scope.selectedColor.substring(0, 2).toUpperCase();

					for (var i = 0; i < $scope.quantity; i++) {
							var count = ++$scope.productCount;
							var obj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: "NA",
								size: $scope.selectedSize,
								gender: $scope.selectedGender,
								color: $scope.selectedColor,
								serialCode: zeroFill(count, 6)
							};
							var finalObj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: "NA",
								size: $scope.selectedSize,
								gender: $scope.selectedGender,
								color: $scope.selectedColor,
								productCount: count,
								serialCode: zeroFill(count, 6),
								isSold: 'N',
								stockUserId: loginUser.id,
								stockDate: new Date()
							}
							$scope.qrCodeArr.push(obj);
							$scope.finalArr.push(finalObj);
					}
				}			

			if($scope.selectedProduct == 'LG')
				if(!$scope.selectedModelCode || !$scope.selectedArtist || !$scope.selectedColor || 
					$scope.selectedModelCode == "" || $scope.selectedArtist == "" || $scope.selectedColor == ""){
					toastr.error("Please select all fields")
					return;
				}else{
					qrCode = $scope.selectedProduct.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedArtist.substring(0, 2).toUpperCase()+"-"+
							$scope.selectedModelCode.split('-')[0]+"-"+							
							"na"+"-"+
							"n"+"-"+
							$scope.selectedColor.substring(0, 2).toUpperCase();

					for (var i = 0; i < $scope.quantity; i++) {
							var count = ++$scope.productCount;
							var obj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: $scope.selectedModelCode,
								size: "NA",
								gender: "NA",
								color: $scope.selectedColor,
								serialCode: zeroFill(count, 6),
							};
							var finalObj = {
								productCode: qrCode+"-"+zeroFill(count, 6),
								productType: $scope.selectedProduct,
								artist: $scope.selectedArtist,
								modelCode: $scope.selectedModelCode,
								size: "NA",
								gender: "NA",
								color: $scope.selectedColor,
								productCount: count,
								serialCode: zeroFill(count, 6),								
								isSold: 'N',
								stockUserId: loginUser.id,
								stockDate: new Date()
							}
							$scope.qrCodeArr.push(obj);
							$scope.finalArr.push(finalObj);
					}
				}

			$scope.showPrintArea = true;

			setTimeout(function () {
				// console.log($scope.qrCodeArr.length);
				for (var i = 0; i < $scope.qrCodeArr.length; i++) {
					generateQRCode("qrPrint" + i, $scope.qrCodeArr[i].productCode);
					// console.log("hello");
				}
			}, 50);

			setTimeout(function(){
				window.scroll({
					 top: document.body.scrollHeight, 
					 left: 0, 
					 behavior: 'smooth' 
				   });
			},10);
		};

		/**
		 * @author : Anurag
		 * @description : Print qrcode and update backend
		 * @date : 12/11/2019
		 */
		$scope.printCode = function(){
			var innerContents = "";

				for (var i = 0; i < $scope.qrCodeArr.length; i++) {
					innerContents =
						innerContents +
						document.getElementById("qrPrintParent" + i).innerHTML;
				}
				var popupWinindow = window.open(
					"",
					"_blank",
					"width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
				);
				popupWinindow.document.open();
				popupWinindow.document.write("<style> @page {  margin: 8;} </style>");
				popupWinindow.document.write(
					'<html><body onload="window.print()">' + innerContents + "</html>"
				);
				popupWinindow.document.close();

				setTimeout(function(){
					var msg = "Saving Stock";
					var url = stockLink + "/addStock";
			 		console.log(JSON.stringify($scope.finalArr));
					genericFactory.add(msg, url, $scope.finalArr).then(function (response) {
						$scope.showPrintArea = false;
						$scope.quantity = "";
						$scope.fetchCount();
					});
				},100);
		}

		function zeroFill( number, width ){
 			width -= number.toString().length;
  			if ( width > 0 ){
    			return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  			}
  			return number + ""; // always return a string
		}

		/**
		 * @author : Anurag
		 * @Description : init controller
		 * @date : 11/11/2019
		 */
		var init = function () {
			$scope.fetchProductType();
			$scope.fetchCount();
		}

		init();

	}
})();
