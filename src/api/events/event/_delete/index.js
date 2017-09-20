const config = require('config');
const appRootDir = require('app-root-dir').get();
const evently = require(appRootDir + "/src/modules/evently")(config.evently);
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {

	app.delete('/events/:id', (req, res) => {
		let id = req.params.id;
		evently.events.remove(id)
			.then(() => res.send())
			.catch(err => errRes(err, res))
	});

};
