const rp = require('request-promise');

module.exports = function (config) {
	function remove (id, event) {
		let options = {
			method: 'DELETE',
			uri: `${config.url}/events/${id}`,
			headers: {
				Authorization: config.jwt
			},
			json: true
		}
	
		return rp(options);
	};

	return remove;
};
