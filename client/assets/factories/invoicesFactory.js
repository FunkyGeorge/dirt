app.factory('invoicesFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/invoices', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/invoices/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}				
			}).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/api/invoices', data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/invoices/${data.id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/invoices/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
