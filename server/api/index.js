const events = require("./events");
const about = require("./about");

module.exports = function(app){
	events(app);
	about(app);
}
