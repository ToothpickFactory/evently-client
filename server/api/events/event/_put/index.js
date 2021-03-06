const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require("eventlyjs").init(config.evently);
const errRes = require(appRootDir + "/server/util/errRes");

// Routes
module.exports = (app) => {
	app.put('/events/:id', (req, res) => {
		let id = req.params.id;
		evently.events.update(id, req.body)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
};
