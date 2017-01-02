var users = require('../controllers/users.js');
var truckers = require('../controllers/truckers.js');
var jobs = require('../controllers/jobs.js');
var applications = require('../controllers/applications.js');
var messages = require('../controllers/messages.js');

module.exports = function(app) {
	// users
	// app.get('/users', users.index);
	app.get('/api/users/:id', users.show);
	app.put('/api/users', users.update);
	app.delete('/api/users', users.delete);
	app.put('/users/changePassword', users.changePassword);
	app.post('/users/register', users.register);
	app.post('/users/login', users.login);

	// TRUCKERS
	// app.get('/truckers', truckers.index);
	app.get('/api/truckers/:id', truckers.show);
	app.put('/api/truckers', truckers.update);
	app.delete('/api/truckers', truckers.delete);
	app.put('/truckers/changePassword', truckers.changePassword);
	app.post('/truckers/register', truckers.register);
	app.post('/truckers/login', truckers.login);

	// JOBS
	app.get('/api/jobs', jobs.index);
	app.get('/api/jobs/:id', jobs.show);
	app.post('/api/jobs', jobs.create);
	app.put('/api/jobs/:action/:id', jobs.update);
	app.delete('/api/jobs/:id', jobs.delete);

	// APPLICATIONS
	app.get('/api/applications', applications.index);
	// app.get('/api/applications/:id', applications.show);
	app.post('/api/applications', applications.create);
	app.put('/api/applications/accept/:id', applications.accept);
	app.put('/api/applications/decline/:id', applications.decline);
	app.put('/api/applications/cancel/:id', applications.cancel);
	app.put('/api/applications/forfeit/:id', applications.forfeit);
	app.put('/api/applications/invoice/:id', applications.invoice);
	app.put('/api/applications/payLeadFee/:id', applications.payLeadFee);
	app.put('/api/applications/payInvoice/:id', applications.payInvoice);
	// app.delete('/api/applications/:id', applications.delete);

	// MESSAGES
	// app.get('/api/messages', messages.index);
	app.get('/api/messages/:id', messages.show);
	app.post('/api/messages', messages.create);
	app.put('/api/messages/:id', messages.update);
	app.delete('/api/messages/:id', messages.delete);
}
