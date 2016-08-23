app.controller('LoginCtrl', ['loginService', 'infoService', '$state', '$mdToast', '$scope',  function(loginService, infoService, state, mdToast, $scope){
    
	var self = this;
	
	self.login =  loginService.getLogin();
	
	self.setLogin = function (login){
		loginService.setLogin(login);
	}

    self.doLogin = function(){
		if (self.login.indexOf(' ') === -1){
			loginService.doLogin({info: {login: self.login, password: self.password}})
            .then(function(res){
				if (res.data.success){
					infoService.setUserId(res.data.userId);
					$scope.$emit('loggined', true);
					state.go('user');
				} else {
					mdToast.show({
						template: '<md-toast class="md-warn">Incorrect login or password</md-toast>',
						position: 'top right',
						delay: 6000
					});
				}
            });
		}
    }
}]);