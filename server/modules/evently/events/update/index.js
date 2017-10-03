const rp = require('request-promise-native');

function composeEvent (client_id, event) {
	event.client_id = client_id;
	return event;
}

module.exports = function (config) {
	function update (id, event) {
		let options = {
			method: 'PUT',
			uri: `${config.url}/events/${id}`,
			headers: {
				Authorization: 'Bearer ' + config.token
			},
			body: composeEvent(config.client_id, event),
			json: true
		}
	
		return rp(options);
	};

	return update;
};
