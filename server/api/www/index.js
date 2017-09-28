const express		= require("express");
const appRootDir 	= require('app-root-dir').get();

// Routes
module.exports = (app) => {
	app.use('/', express.static(appRootDir + '/www/dist'))
};
