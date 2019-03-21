const router = require('express').Router();
const A = require('../models/application');
const { Application, AppToken } = require('../models/application');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const log = require('../logger');
require('dotenv').config();
const secret = process.env.SECRET || '$3r10uslyCh@ng3Th1$!';
const uniq = require('uniqid');

const isAppOwner = require('../middleware/isAppOwner');

const moment = require('moment');

const passport = require('passport');
const jwt = require('jsonwebtoken');


module.exports = (secret, public) => {

	router.get('/guest/list', (req, res) => {
		Application.find({}, 'appName appOwner appDescription appIcon appBanner users permBannedUsers redirectURL tempBannedUsers').then(apps => {
			if (!apps) res.status(400).json({ message: 'no apps currently in the database.' });
			res.json(apps);
		}).catch(err => {
			res.status(500).json(err)
		});
	});

	//ROUTE FOR CREATING NEW APPLICATION.
	//tested working, and documented in postman
	router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
		const { errors, isValid } = require('../validation/application').registerApp(
			req.body
		);
		if (!isValid) return res.status(400).json(errors);
		const name = req.body.appName;
		const password = req.body.appPass;
		const password2 = req.body.appPass2;
		const redirectURL = req.body.redirectURL;
		Application.findOne({ appName: req.body.appName }).then(app => {
			if (app) {
				errors.appName = 'Application with that name already exists';
				return res.status(400).json(errors);
			} else {
				if (password === password2) {
					const newApp = new Application({
						appPass: password,
						appName: name,
						appOwner: req.user.id,
						redirectURL: redirectURL
					});
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newApp.appPass, salt, (err, hash) => {
							if (err) throw err;
							newApp.appPass = hash;
							newApp
								.save()
								.then(app => res.json(app))
								.catch(err => res.status(400).json(err));
						});
					});
				} else {
					res.status(400).json({ error: 'passwords do not match' });
				}
			}
		}).catch(err => res.status(500).json({ error: err, message: 'issue with finding application in database.' }));
	});

	/**
	 * Route to add a user to an application
	 * 
	 */

	router.post('/addUser/:appId/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
		const appId = req.params.appId;
		const userId = req.params.userId;
		Application.findById(appId).then(app => {
			if (!app) res.status(500).json({ message: 'issue locating app to add user to.' });
			app.users.push(userId).save().then(a => {
				if (!a) res.status(500).json({ message: 'issue saving app to database after user push.' });
				res.json(a);
			}).catch(err => res.status(500).json(err));
		}).catch(err => res.status(500).json(err));
	});

	/**
	 * Route to temporarily ban a user
	 * this will default to banning a user for one month
	 */

	router.post('/tempBan/:appId/:userId', passport.authenticate('jwt', { session: false }), isAppOwner, (req, res) => {
		const appId = req.params.appId;
		const userId = req.params.userId;
		const banTime = moment.add(30, 'days').fromNow();
		Application.findById(appId).then(app => {
			if (!app) res.status(500).json({ error: 'internal Server Error', message: 'Issue with Retrieving application from database.' });
			User.findById(userId).then(user => {
				if (!app) res.status(500).json({ error: 'Internal Server Error', message: 'Issue retrieving user from database.' });
				const banned = {
					expires: banTime,
					user,
				};
				app.tempBannedUsers.push(banned);
				app.save.then(app => {
					if (!app) res.status(500).json({ message: 'Internal Server Error', message: 'Issue saving application record to database.' });
					res.json({ message: 'user successfully banned.' });
				}).catch(err => res.status(500).json(err));
			}).catch(err => res.status(500).json(err));
		}).catch(err => res.status(500).json(err));
	});

	/**
	 * Route to permanently ban a user
	 * this will not be able to be removed.
	 */

	router.post('/permBan/:appId/:userId', passport.authenticate('jwt', { session: false }), isAppOwner, (req, res) => {
		const appId = req.params.appId;
		const userId = req.params.userId;
		Application.findById(appId).then(app => {
			if (!app) res.status(500).json({ error: 'Internal Server Error', message: 'Issue locating application in database' });
			User.findById(userId).then(user => {
				if (!user) res.status(500).json({ error: 'Internal Server Error', message: 'Issue locating user in database.' });
				app.permBannedUsers.push(user);
				app.save().then(app => res.json({ message: 'Successfully banned user permenantly' }));
			}).catch(err => res.status(500).json(err));
		}).catch(err => res.status(500).json(err));
	});

	router.get('/bans/:appId/:userId', (req, res) => {
		const appId = req.params.appId;
		const userId = req.params.userId;
		Applicaiton.findById(appId).then(app => {
			if (!app) res.status(500).json({ message: 'Issue finding App In database.' });
			if (app.tempBannedUsers.indexOf(userId) !== -1) {
				const banInfo = app.tempBannedUsers.filter(u => u.user === userId);
				res.json({ notBanned: false, tempBanInfo: banInfo, message: `user is temporarily banned. Ban Expires: ${banInfo.expires}` });
			} else if (app.permBannedUsers.indexOf(userId)) {
				res.json({ notBanned: false, message: 'User is Permanently Banned. No Appeals.' });
			} else {
				res.json({ notBanned: true, message: 'User is not banned.' });
			}
		}).catch(err => res.status(500).json(err));
	});

	//route to login an application
	//tested working
	//documented in postman
	router.post('/login', (req, res) => {
		const { errors, isValid } = require('../validation/application').loginApp(
			req.body
		);
		if (!isValid) return res.status(400).json(errors);

		Application.findOne({ appName: req.body.appName })
			.then(app => {
				if (!app) {
					errors.appName = 'Application does not exist in this context.';
					return res.status(400).json(errors);
				} else {
					/**
					 * 1. Check if the app password and has compares.
					 * 2. if Y create token and return to application.
					 * 3. if N return errors to the client.
					 */
					bcrypt.compare(req.body.appPass, app.appPass).then(isMatch => {
						if (isMatch) {
							const payload = {
								id: app.id,
								name: app.appName,
								owner: app.appOwner,
							};
							jwt.sign(payload, secret, {
								expiresIn: '30d',
								issuer: 'Garnet Labs, DBA',
							}, (err, token) => {
								if (err) res.status(500).json({ error: err, message: 'Issue signing token' });
								res.json({ success: true, token: `Bearer ${token}` });
							});
						} else {
							errors.password = 'Password is incorrect';
							res.status(400).json(errors);
						}
					});
				}
			})
			.catch(err => res.status(400).json(err));
	});

	router.get('/key', passport.authenticate('app-jwt', { session: false }), (req, res) => {
		res.json({ key: public });
	});

	//Route to get an Application
	//tested working correctly
	//documented in postman
	router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
		Application.find({ appOwner: req.user.id }, 'appName appDescription appIcon appBanner users permBannedUsers appOwner ownerDelegates').then(apps => {
			if (!apps) res.status(404).json({ error: 'No Apps from this user Found' });
			res.json(apps);
		}).catch(err => res.status(500).json({ error: err, message: 'issue finding apps in the database.' }));
	});

	//ROUTE For Updating an APPLICATION

	router.patch('/:appId', passport.authenticate('jwt', { session: false }), (req, res) => { });

	//route to delete an application

	router.delete('/:appId', passport.authenticate('jwt', { session: false }), (req, res) => { });

	return router;
}
