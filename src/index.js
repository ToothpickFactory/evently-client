const config			= require("config");
const express			= require("express");
const app					= express();
const bodyParser	= require('body-parser');
const cors        = require('cors');
const api					= require('./api');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api(app);

app.listen(config.port, () => { console.log(`Evently-Client listing on port: ${config.port}`) });
