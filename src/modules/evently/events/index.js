const create 	= require('./create');
const search 	= require('./search');
const get		= require('./get');
const update	= require('./update');
const remove	= require('./remove');
const join		= require('./join');
const leave		= require('./leave');

module.exports = function (config) {
	return {
		create: create(config),
		search: search(config),
		get: get(config),
		update: update(config),
		remove: remove(config),
		join: join(config),
		leave: leave(config)
	}
}