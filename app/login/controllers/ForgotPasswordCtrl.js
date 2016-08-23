app.controller('ForgotPasswordCtrl', ['loginService', '$state', '$mdDialog', function(loginService, state, mdDialog){
    var self = this;

	self.login =  loginService.getLogin();
	
	self.getPassword = function(){
		loginService.getPassword({login: self.login})
			.then(function(res){
				self.password = res.data.password;
					self.showDialog();
			});
    };
	
	self.showDialog = function() {
		mdDialog.show({
			contentElement: '.forgotPassword',
			parent: angular.element(document.body)
		});
	};
	
	self.closeDialog = function() {
        mdDialog.hide();
		state.go('login');
    }
}]);