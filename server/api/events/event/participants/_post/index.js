const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require("eventlyjs").init(config.evently);
const errRes = require(appRootDir + "/server/util/errRes");

// Routes
module.exports = (app) => {

	app.post('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;			
		let participant = req.body;
		evently.events.join(eventId, participant)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});

};
