app.controller('UserCtrl', ['loginService', 'infoService', '$state', '$scope', function(loginService, infoService, state, $scope){
	
    var self = this;
	
	$scope.$emit('loading', true);
	
    var userId = infoService.getUserId();
	
	infoService.getInfo(userId)
		.then(function(res){
			self.firstName = res.data.userInfo.firstName;
			self.lastName = res.data.userInfo.lastName;
			self.age = res.data.userInfo.age;
			self.birthday = res.data.userInfo.birthday;
			},
			function (resp) {
				if (resp.status == 401) {
					state.go('login');
				}
		}).finally(function() {
			$scope.$emit('userName', self.firstName + ' ' + self.lastName);
			$scope.$emit('loggined', true);
			$scope.$emit('loading', false);
		});
		
}]);