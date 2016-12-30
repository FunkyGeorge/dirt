app.factory('usersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/users').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		show: function(id, callback) {
			$http.get(`/api/users/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/users`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		changePassword: function(data, callback) {
			$http.put(`/users/changePassword`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res){
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/users', {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		register: function(data, callback) {
			$http.post('/users/register', data).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/users/login', data).then(function(res) {
				callback(res.data);
			});
		}
	}
})
