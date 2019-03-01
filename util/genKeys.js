const crypto = require("crypto");
const log = require("../logger");
const prime_length = 60;

const fs = require('fs');

const mongoose = require("mongoose");
const KeyPair = require("../models/keyPair");

const diffHell = crypto.createDiffieHellman(prime_length);

const debug = true;

const ensureKeys = async () => {
	const privateStatus = await fs.stat('../keys/private.key');
	const pubStatus = await fs.stat('../keys/public.key');
	if((privateStatus.indexOf('Error') > -1) && (pubStatus.indexOf('Error')> -1)){
		console.log('Error occurred looking for key files. Generating keys.');
		const isKeyFolder = await isKeyFolderCreated();
		if(!isKeyFolder){
			await fs.mkdir('../keys');
		}
		diffHell.generateKeys("base64");
		const public = diffHell.getPublicKey("base64");
		const private = diffHell.getPrivateKey('base64');

		await fs.writeFile('../keys/public.key', public);
		await fs.writeFile('../keys/private.key', private);
		return {public, private};
	} else {
		const public = await fs.readFile('../keys/public.key');
		const private = await fs.readFile('../keys/private.key');
		return {public, private};
	}
};

const isKeyFolderCreated = async () => {
	const folderStat = fs.stat('../keys');
	if(folderStat.indexOf('Error')> -1){
		return false;
	}
	return true;
};

const generateKeys = () => {
  diffHell.generateKeys("base64");
  log.info(`New Public Key Generated: ${diffHell.getPublicKey("base64")}`);
  debug
    ? log.info(`New Private Key Generated: XXXX`)
    : log.info(
        `New Private Key Generated: ${diffHell.getPrivateKey("base64")}`
      );
  let keyPair = new KeyPair({
    public: diffHell.getPublicKey("base64"),
    private: diffHell.getPrivateKey("base64"),
    timeOfChange: new Date().now()
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
  return KeyPair.findOne({}, "public timeOfChange").sort("-timeOfChange");
};

const getLastPrivateKey = () => {
  return KeyPair.findOne({}, "private timeOfChange").sort("-timeOfChange");
};

const getLastTimeStamp = () => {
  return KeyPair.findOne({}, "timeOfChange").sort("-timeOfChange");
};
const checkForPrivateKey = () => {
  le;
};

module.exports = {
  generateKeys,
  getLastPrivateKey,
  getLastPublicKey,
  getLastTimeStamp,
  checkForPrivateKey,
	ensureKeys
};
