const rp = require('request-promise-native');

module.exports = function (config) {
	function leave (id, userId) {
		let options = {
			method: 'DELETE',
			uri: `${config.url}/events/${id}/participants/${userId}`,
			headers: {
				Authorization: 'Bearer ' + config.token
			},
			json: true
		}
	
		return rp(options);
	};

	return leave;
};
