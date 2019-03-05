const crypto = require('crypto');
const log = require('../logger');
const prime_length = 60;
const keypair = require('keypair');

const fs = require('fs');
const promisify = require('util').promisify;

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const mongoose = require('mongoose');
const KeyPair = require('../models/keyPair');

const ensureFolder = require('./ensureFolder');

const diffHell = crypto.createDiffieHellman(prime_length);

const debug = true;

const ensureKeys = () => {
	return new Promise((resolve, reject) => {
		ensureFolder('./keys').then(() => {
			/**
			 * Ensure that both the private and public keys
			 * are created, and if not create them both.
			 * Never generate just a single key.
			 */
			try {
				if (
					!fs.existsSync('./keys/private.key') &&
					!fs.existsSync('./keys/public.key')
				) {
					log.info('Keys do not exist. Creating them.');
					const pair = keypair();
					// diffHell.generateKeys('base64');
					// const public = diffHell.getPublicKey('base64');
					// const private = diffHell.getPrivateKey('base64');
					fs.writeFileSync('./keys/public.key', pair.public);
					fs.writeFileSync('./keys/private.key', pair.private);
					log.info('keys created and being served to the app.');
					resolve({ private: pair.private,public: pair.public });
				} else {
					log.info('keys are already generated. Loading from key files.');
					const public = fs.readFileSync('./keys/public.key', 'utf8');
					const private = fs.readFileSync('./keys/private.key', 'utf8');
					log.info('keys loaded from files. Serving to the rest of the app.');
					resolve({ private, public });
				}
			} catch (e) {
				log.error('issue loading or generating keys. Sorry.', e);
				reject(e);
			}
		});
	});
};

const ensurePublicKey = () => {
	return new Promise((resolve, reject) => {
		ensureFolder('../keys')
			.then(async () => {
				if (!fs.statSync('../keys/public.key')) {
					diffHell.generateKeys('base64');
					const public = diffHell.getPublicKey('base64');
					const private = diffHell.getPrivateKey('base64');

					await writeFile('../keys/public.key', public);
					await writeFile('../keys/private.key', private);
					resolve(public);
				} else {
					const public = await readFile('../keys/public.key');
					resolve(public);
				}
			})
			.catch(err => reject(err));
	});
};

const ensurePrivateKey = () => {
	return new Promise((resolve, reject) => {
		ensureFolder('../keys')
			.then(async () => {
				if (!fs.statSync('../keys/private.key')) {
					diffHell.generateKeys('base64');
					const public = diffHell.getPublicKey('base64');
					const private = diffHell.getPrivateKey('base64');

					await writeFile('../keys/public.key', public);
					await writeFile('../keys/private.key', private);
					resolve(private);
				} else {
					const private = await readFile('../keys/private.key');
					resolve(private);
				}
			})
			.catch(err => reject(err));
	});
};

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
		timeOfChange: new Date().now(),
	});

	return keyPair
		.save()
		.then(key => {
			log.info(`New Public Key Saved to DB: ${key.public}`);
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
	ensurePublicKey,
	ensurePrivateKey,
	ensureKeys,
};
