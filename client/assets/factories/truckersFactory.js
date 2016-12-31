app.factory('truckersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/truckers').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		show: function(id, callback) {
			$http.get(`/api/truckers/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/truckers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		changePassword: function(data, callback) {
			$http.put(`/truckers/changePassword`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/truckers', {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		register: function(data, callback) {
			$http.post('/truckers/register', data).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/truckers/login', data).then(function(res) {
				callback(res.data);
			});
		}
	}
})
