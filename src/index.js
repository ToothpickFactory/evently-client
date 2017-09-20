const config			= require("config");
const express			= require("express");
const app				= express();
const bodyParser		= require('body-parser');
const cors            	= require('cors');
const getDirectories	= require('./util/directoryFinder');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require all routes from the routes directory
getDirectories(__dirname + '/api/').forEach(dir => require(`${__dirname}/api/${dir}`)(app));

app.listen(config.port, () => { console.log(`Evently-Client listing on port: ${config.port}`) });
