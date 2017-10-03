const rp = require('request-promise-native');

function composeEvent (client_id, _event) {
	_event.client_id = client_id;
	return _event;
}

module.exports = function (config) {
	function create (_event) {
		let options = {
			method: 'POST',
			uri: `${config.url}/events`,
			body: composeEvent(config.client_id, _event),
			json: true,
			headers: {
				Authorization: 'Bearer ' + config.jwt
			}
		}
	
		return rp(options);
	};
	
	return create;
};
