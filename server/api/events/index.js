const event = require("./event");
const _get = require("./_get");
const _post = require("./_post");

module.exports = function(app){
	event(app);
	_get(app);
	_post(app);
}