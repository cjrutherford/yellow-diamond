const crypto = require('crypto');
const log = require('../logger');
const prime_length = 60;

const mongoose = require('mongoose');
const KeyPair = require('../models/keyPair');

const diffHell = crypto.createDiffieHellman(prime_length);

const debug = true;

const generateKeys = () => {
	diffHell.generateKeys('base64');
	log.info(`New Public Key Generated: ${diffHell.getPublicKey('base64')}`);
	debug
		? log.info('New Private Key Generated: XXXX')
		: log.info(
			`New Private Key Generated: ${diffHell.getPrivateKey('base64')}`
		  );
	let keyPair = new KeyPair({
		public: diffHell.getPublicKey('base64'),
		private: diffHell.getPrivateKey('base64'),
		timeOfChange: Date.now(),
	});

	return keyPair
		.save()
		.then(key => {
			log.info(`New Public Key Saved to DB: ${key.public}`);
			console.dir(key);
			return key;
		})
		.catch(err => log.error(err));
};

const getLastPublicKey = () => {
	return KeyPair.findOne({}, 'public timeOfChange').sort('-timeOfChange');
};

const getLastPrivateKey = () => {
	return KeyPair.findOne({}, 'private timeOfChange').sort('-timeOfChange');
};

const getLastTimeStamp = () => {
	return KeyPair.findOne({}, 'timeOfChange').sort('-timeOfChange');
};
const checkForPrivateKey = () => {};

module.exports = {
	generateKeys,
	getLastPrivateKey,
	getLastPublicKey,
	getLastTimeStamp,
	checkForPrivateKey,
};
