const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const log = require('../logger');
require('dotenv').config();
const secret = process.env.SECRET || 'thisneedstob3ch@ng3D';
const KeyPair = require('../models/keyPair');
const ResetLink = require('../models/resetLink');

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = private => {
	//ROUTE POST REGISTER
	router.post('/register', (req, res) => {
		const { errors, isValid } = require('../validation/user').registerUser(
			req.body
		);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		User.findOne({ emailAddress: req.body.emailAddress }).then(user => {
			if (user) {
				errors.emailAddress = 'Email Already Exists';
				return res.status(400).json(errors);
			} else {
				const newUser = new User({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					userName: req.body.userName,
					emailAddress: req.body.emailAddress,
					password: req.body.password,
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then(user => res.json(user))
							.catch(err => res.status(400).json(err));
					});
				});
			}
		});
	});

	router.post('/reset', (req, res) => {
		const { errors, isValid } = require('../validation/user').resetUser(
			req.body
		);

		if (!isValid) {
			return res.status(400).json(error);
		}

		const email = req.body.email;

		User.findOne({ email }).then(user => {
			if (!user) {
				errors.email = 'No Account Found.';
				return res.status(404).json(errors);
			}
			/* TODO://
			 *  1. Generate a unique ID, (link.id)
			 *  2. Merge Link to Reset Password route.
			 *  3. Send Email to email with password link.
			 */
			new ResetLink({ email }).save().then(link => {
				if (!link) {
					log.error(
						'Unable to save reset link to database, please check the connection'
					);
					res
						.status(500)
						.json({
							type: 'Error',
							message:
								'Unable to save reset link to database, please check the connection',
						});
				}
				/**
				 * This should reflect the url of the running host.
				 * Research how to grab the base URL...
				 */
				const resetReferral = `http://localhost:3201/users/reset/${link.id}`;
				queueEmail(resetReferral, link.email);
			});
		});
	});

	//ROTUER POST LOGIN
	router.post('/login', (req, res) => {
		const { errors, isValid } = require('../validation/user').loginUser(
			req.body
		);
		if (!isValid) {
			return res.status(400).json(err);
		}
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ email }).then(user => {
			if (!user) {
				errors.email = 'No Account Found';
				return res.status(404).json(errors);
			}

			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					const payload = {
						id: user._id,
						name: user.userName,
					};
					jwt.sign(payload, private, { expiresIn: 36000 }, (err, token) => {
						if (err)
							res.status(500).json({ error: 'Error signing token', raw: err });
						const refresh = uuid.v4();
						res.json({ success: true, token: `Bearer ${token}` });
					});
				} else {
					errors.password = 'Password is incorrect';
					res.status(400).json(errors);
				}
			});
		});
	});

	router.get(
		'/current',
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
			User.findOne({ email })
				.then(user => {
					if (!user) {
						res.status(404).json({ error: 'User Not Found.' });
					}
					res.json(user);
				})
				.catch(err => res.status(400).json(err));
		}
	);

	return router;
};
