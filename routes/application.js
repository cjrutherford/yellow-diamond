const router = require('express').Router();
const A = require('../models/application');
const { Application, AppToken } = require('../models/application');
const bcrypt = require('bcryptjs');
const log = require('../logger');
require('dotenv').config();
const secret = process.env.SECRET || '$3r10uslyCh@ng3Th1$!';
const uniq = require('uniqid');

const passport = require('passport');
const jwt = require('jsonwebtoken');


module.exports = (secret, public) => {

	//ROUTE FOR CREATING NEW APPLICATION.
	//tested working, and documented in postman
	router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
		const { errors, isValid } = require('../validation/application').registerApp(
			req.body
		);
		if (!isValid) return res.status(400).json(errors);
		const name = req.body.appName;
		const password = req.body.appPass;
		const password2 = req.body.appPass2;
		Application.findOne({ appName: req.body.appName }).then(app => {
			if (app) {
				errors.appName = 'Application with that name already exists';
				return res.status(400).json(errors);
			} else {
				if(password === password2){
					const newApp = new Application({
						appPass: password,
						appName: name,
						appOwner: req.user.id
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
					res.status(400).json({error: 'passwords do not match'});
				}
			}
		}).catch(err => res.status(500).json({error: err, message: 'issue with finding application in database.'}));
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
						if(isMatch){
							const payload = {
								id: app.id,
								name: app.appName,
								owner: app.appOwner,
							};
							jwt.sign(payload, secret, {
								expiresIn: '30d',
								issuer: 'Garnet Labs, DBA',
							}, (err, token) => {
								if(err) res.status(500).json({error: err, message: 'Issue signing token'});
								res.json({success: true, token: `Bearer ${token}`});
							});
						} else{
							errors.password = 'Password is incorrect';
							res.status(400).json(errors);
						}
					});
				}
			})
			.catch(err => res.status(400).json(err));
	});
	
	router.get('/key', passport.authenticate('app-jwt', {session: false}), (req,res) => {
		res.json({key: public});
	});
	
	//Route to get an Application
	//tested working correctly
	//documented in postman
	router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
		Application.find({appOwner: req.user.id}).then(apps => {
			if(!apps) res.status(404).json({error: 'No Apps from this user Found'});
			res.json(apps);
		}).catch(err => res.status(500).json({error: err, message: 'issue finding apps in the database.'}));
	});
	
	//ROUTE For Updating an APPLICATION
	
	router.patch('/:appId', passport.authenticate('jwt', {session: false}), (req, res) => {});
	
	//route to delete an application
	
	router.delete('/:appId', passport.authenticate('jwt', {session: false}), (req, res) => {});

	return router;
}
