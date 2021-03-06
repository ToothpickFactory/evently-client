const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require("eventlyjs").init(config.evently);
const errRes = require(appRootDir + "/server/util/errRes");

// Routes
module.exports = (app) => {
	app.delete('/events/:id/participants/:userId', (req, res) => {
		let eventId = req.params.id;			
		let userId = req.params.userId;
		evently.events.leave(eventId, userId)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});
};

