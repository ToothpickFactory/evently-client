const rp = require('request-promise');

module.exports = function (config) {
	function leave (id, userId) {
		let options = {
			method: 'DELETE',
			uri: `${config.url}/events/${id}/participants/${userId}`,
			headers: {
				Authorization: config.jwt
			},
			json: true
		}
	
		return rp(options);
	};

	return leave;
};
