app.factory('jobsFactory', function($http, $cookies) {
	return {
		index: function(data, zips, callback) {
			$http.get('/api/jobs', {
				headers: {
					'authorization': `Bearer ${$cookies.get('ronin_token')}`,
					'scroll': data[0],
					'sort': data[2],
					'zips': zips
				}
			}).then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/jobs/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		getUserJobs: function(id, callback) {
			$http.get(`/api/jobs/user/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/api/jobs', data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		relist: function(id, callback) {
			$http.put(`/api/jobs/relist/${id}`, null, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		edit: function(id, data, callback) {
			$http.put(`/api/jobs/edit/${id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/jobs/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
