(function() {
	'use strict';

	angular.module('myApp.home').controller('HomeController', HomeController);
	
	HomeController.$inject = ['$scope', 'ApiEndpoint','$state'];


	function HomeController($scope, ApiEndpoint, $state) {
		var vm = angular.extend(this, {

		});

		(function activate() {

		})();

	}
})();
