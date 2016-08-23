app.service('infoService', ['$http', '$state', function(http, state){
	var self = this;
	
    self.getInfo = function(id) {
        return http({
            method: 'get',
            url: '/getInfo/' + id
        })
    };
	
	self.setInfo = function(data) {
        return http({
            method: 'put',
            url: '/setInfo/' + data.userInfo.id,
			data: data
        })
    };
	
	self.setUserId = function(userId) {
		self.userId = userId;
	};
	
	
	self.getUserId = function() {
		return self.userId;
	};
	
	self.setLoading = function(loading) {
		self.loading = loading;
	};
	
	
	self.getLoading = function() {
		return self.loading;
	};

	self.init = function () {
		if (!self.userId) {
			return http({
				method: 'get',
				url: '/getId'
			}).then(
				function (resp) {
					self.userId = resp.data.id;
				},
				function (resp) {
					if (resp.status == 401) {
						state.go('login');
					}
				}
			);
		}
		return self.userId;
	};

	self.getIdFromSession = function () {
		return
	}
	
	self.loading = false;
}]);