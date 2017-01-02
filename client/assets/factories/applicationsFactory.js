app.factory('applicationsFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/applications', {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		// show: function(id, callback) {
		// 	$http.get(`/api/applications/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}				
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/applications', data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		accept: function(id, callback) {
			$http.put(`/api/applications/accept/${id}`, null, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		decline: function(id, callback) {
			$http.put(`/api/applications/decline/${id}`, null, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},		
		cancel: function(id, callback) {
			$http.put(`/api/applications/cancel/${id}`, null, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},		
		forfeit: function(id, callback) {
			$http.put(`/api/applications/forfeit/${id}`, null, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		invoice: function(id, data, callback) {
			$http.put(`/api/applications/invoice/${id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		payLeadFee: function(id, data, callback) {
			$http.put(`/api/applications/payLeadFee/${id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		payInvoice: function(id, data, callback) {
			$http.put(`/api/applications/payInvoice/${id}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		// delete: function(id, callback) {
		// 	$http.delete(`/api/applications/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// }
	}
})