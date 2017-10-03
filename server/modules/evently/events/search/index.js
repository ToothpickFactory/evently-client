const rp = require('request-promise-native');

module.exports = function (config) {
	function search (query) {
		let options = {
			method: 'GET',
			uri: `${config.url}/events`,
			qs: query,
			headers: {
				Authorization: 'Bearer ' + config.jwt
			},
			json: true
		}
	
		return rp(options);
	};

	return search;
};
