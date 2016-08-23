app.controller('UserProfileCtrl', ['loginService', 'infoService', '$state', '$scope', function(loginService, userInfo, state, $scope){
	
    var self = this;
	
	self.userId = userInfo.getUserId();
	
	$scope.$emit('loading', true);
	
	userInfo.getInfo(self.userId)
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
		
	
	self.setInfo = function(){
		userInfo.setInfo({userInfo: {
			id: self.userId,
			firstName: self.firstName,
			lastName: self.lastName,
			age: self.age,
			birthday: self.birthday}})
			/*here I can't write {userInfo: self.user} (before define user with self properties) I don't know why )*/
			.then(function(res){
				self.firstName = res.data.firstName;
				self.lastName = res.data.lastName;
				self.age = res.data.age;
				self.birthday = res.data.birthday;
				state.go('user');
            });
    }
     
}]);