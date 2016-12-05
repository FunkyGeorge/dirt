app.factory('truckersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/truckers').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// show: function(username, callback) {
		// 	$http.get(`/api/truckers/${username}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		update: function(data, callback) {
			$http.put(`/api/truckers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/truckers', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
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
		},
		fb_register: function(data, callback) {
			$http.post('/truckers/fb_register', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_login: function(data, callback) {
			$http.post('/truckers/fb_login', data).then(function(res) {
				callback(res.data);
			});
		}		
	}
})
