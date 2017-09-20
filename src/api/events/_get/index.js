const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require(appRootDir + "/src/modules/evently")(config.evently);
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events', (req, res) => {
		let query = req.query;
		evently.events.search(query)
			.then(events => res.send(events))
			.catch(err => errRes(err, res))
	});
};
