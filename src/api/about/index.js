const AboutModule = require("../../modules/about");

// Routes
module.exports = (app) => {
  app.get('/', (req, res) => {
		AboutModule.details()
			.then(details => res.send(details))
			.catch(err => res.status(400).send(err));
	});
};
