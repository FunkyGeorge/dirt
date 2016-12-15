app.factory('contractorsFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/contractors').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// show: function(username, callback) {
		// 	$http.get(`/api/contractors/${username}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		update: function(data, callback) {
			$http.put(`/api/contractors`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/contractors', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		register: function(data, callback) {
			$http.post('/contractors/register', data).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/contractors/login', data).then(function(res) {
				callback(res.data);
			});
		}	
	}
})
