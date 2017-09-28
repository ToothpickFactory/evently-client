const _post = require("./_post");
const _delete = require("./_delete");

module.exports = function(app){
	_post(app);
	_delete(app);
}