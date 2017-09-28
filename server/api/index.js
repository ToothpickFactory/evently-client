const events = require("./events");
const www = require("./www");

module.exports = function(app){
	events(app);
	www(app);
}
