app.service('loginService', ['$http', function(http){

	var self = this;
	
	self.setLogin = function(login) {
		self.login = login;
	};
	
	self.getLogin = function() {
		return self.login;
	};
	
	self.setPassword = function(password) {
		self.password = password;
	};
	
	self.getPassword = function() {
		return self.password;
	};
	
	self.doLogin = function(info) {
        return http({
            url: '/doLogin',
            method: 'post',
            data: info
        })
    };
	
	self.logout = function() {
        return http({
            url: '/logout',
            method: 'delete'
        })
    };

    self.getPassword = function(login) {
        return http({
            url: '/getPassword',
            method: 'post',
            data: login
        });
    };
}]);