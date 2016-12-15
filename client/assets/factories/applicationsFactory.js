app.factory('applicationsFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/applications', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		// show: function(id, callback) {
		// 	$http.get(`/api/applications/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}				
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/applications', data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/applications/${data.id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/applications/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
