const express = require('express');

const cp = require('cookie-parser');
const bp = require('body-parser');

const app = express();

module.exports = (passport, routes, log) => {
	app.use(cp());
	app.use(bp.json());
	app.use(bp.urlencoded({ extended: true }));

	app.use(passport.initialize());

	app.use((req, res, next) => {
		if (req.body) log.info(req.body);
		if (req.query) log.info(req.query);
		if (req.params) log.info(req.params);
		log.info(
			`Received a ${req.method} request from ${req.ip} for ${req.url}`
		);
		next();
	});

	routes.forEach(x => app.use(x.routePath, require(x.filePath)));

	// app.listen(config.port, err => {
	// 	if (err) reject(err);
	// 	log.info(`Listening for requests on port: ${config.port}`);
	// });

	return app;
};
