const log = require('./logger');
const passport = require('passport');
const sequential = require('promise-sequential');
const mongooseInit = require('./initializers/mongoose');
const expressInit = require('./initializers/express');
const config = require('./initializers/environment');

log.info('beginning initialization of App.');

const routes = [
	{
		routePath: '/user',
		filePath: '../routes/user',
	},
	{
		routePath: '/app',
		filePath: '../routes/application',
	},
];

let keys;

mongooseInit(config).then(() => {});

sequential([
	() => {
		mongooseInit(config);
	},
	() => {
		keys = require('./initializers/keyconfig')();
	},
	// () => {
	// 	require('./passport-config')(passport, keys);
	// },
	// expressInit(config, passport, routes, log),
])
	.then(values => {
		values.forEach(v => log.info(v));
		log.info('App is initialized.');
	})
	.catch(err => log.error(err));
