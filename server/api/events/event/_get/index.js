const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require("eventlyjs").init(config.evently);
const errRes = require(appRootDir + "/server/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events/:id', (req, res) => {
		let id = req.params.id;
		evently.events.get(id)
			.then(event => res.send(event))
			.catch(err => errRes(err, res))
	});
};
