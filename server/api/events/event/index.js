const participants = require("./participants");
const _get = require("./_get");
const _put = require("./_put");
const _delete = require("./_delete");

module.exports = function(app){
	participants(app);
	_get(app);
	_put(app);
	_delete(app);
}