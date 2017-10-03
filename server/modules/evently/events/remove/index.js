const rp = require('request-promise-native');

module.exports = function (config) {
	function remove (id, event) {
		let options = {
			method: 'DELETE',
			uri: `${config.url}/events/${id}`,
			headers: {
				Authorization: 'Bearer ' + config.jwt
			},
			json: true
		}
	
		return rp(options);
	};

	return remove;
};
