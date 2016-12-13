app.factory('messagesFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/messages', {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		show: function(id, callback) {
			$http.get(`/api/messages/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}				
			}).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/api/messages', data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/messages/${data.id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/messages/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
