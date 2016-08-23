app.controller('MainPageCtrl', ['loginService', '$scope', '$translate', '$state', function(loginService, $scope, $translate, state){
	
    var self = this;
	
	$scope.$on('loading', function(event, fromChild) {
		$scope.loading = fromChild;
	});
	
	$scope.$on('userName', function(event, fromChild) {
		$scope.name = fromChild;
	});
	
	$scope.$on('loggined', function(event, fromChild) {
		$scope.loggined = fromChild;
	});
	
	var buttonRu = angular.element(document.querySelector("button.ru"));
	var buttonEn = angular.element(document.querySelector("button.en"));
	
	$scope.switchLang = function(key){
		$translate.use(key);
		if (key == 'ru'){
			buttonRu.addClass('active');
			buttonEn.removeClass('active');
		}
		if (key == 'en'){
			buttonRu.removeClass('active');
			buttonEn.addClass('active');
		}
	}
	
	self.logout = function () {
		return loginService.logout()
		.then (function () {
			$scope.$emit('loggined', false);
			$scope.$emit('userName', false);
			state.go('login');
		});
	};
}]);