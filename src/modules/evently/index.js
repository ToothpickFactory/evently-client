const jwt		= require('jsonwebtoken');
const events 	= require('./events');

module.exports = function (config) {
	let decoded = jwt.decode(config.jwt);
	let _config = Object.assign({}, config, {client_id: decoded._id});
	return {
		events: events(_config)
	}
}