(function() {
	'use strict';

	angular
		.module('myApp.main')
		.controller('mainController', mainController);

		mainController.$inject = ['localStorageService', 'ApiEndpoint', '$state','loginFactory','$rootScope',"$scope"];

	/* @ngInject */
	function mainController(localStorageService, ApiEndpoint, $state,loginFactory,$rootScope,$scope) {
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		
		console.log(JSON.stringify(userDetail));
		var vm = angular.extend(this, {
			doLogout : doLogout,
			user : userDetail,
		});

		(function activate() {
			$('.loading').show();
			$rootScope.loader=false;
			$scope.userPermissionDetails  = sessionStorage.getItem('permissions');
			
			 $scope.userPermissionsObj = JSON.parse($scope.userPermissionDetails);
			 $scope.userPermissions = $scope.userPermissionsObj.permissions;
			 console.log(JSON.stringify($scope.userPermissions));
			 givePermissions();
		})();

		// ******************************************************

		function doLogout (){
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

		function givePermissions(){

			for(var i = 0; i < $scope.userPermissions.length; i++){

				if($scope.userPermissions[i].permissionValue == "qrGenerator")
					$scope.showQrGenerator = true;

				if($scope.userPermissions[i].permissionValue == "storageBin")
					$scope.showStorageBins = true;

				if($scope.userPermissions[i].permissionValue == "sales")
					$scope.showSales = true;

				if($scope.userPermissions[i].permissionValue == "access_management")
					$scope.showAccessManagement = true;
			}

			$('.loading').hide();
		}

	}
})();