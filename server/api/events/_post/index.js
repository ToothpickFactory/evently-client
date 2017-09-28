const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require(appRootDir + "/server/modules/evently")(config.evently);
const errRes = require(appRootDir + "/server/util/errRes");

// Routes
module.exports = (app) => {
	app.post('/events', (req, res) => {
		evently.events.create(req.body)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
};
