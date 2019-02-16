const keygen = require('../util/genKeys');

const doKeysExist = async () => {
	let lastTimeStamp = await keygen.getLastTimeStamp();
	return lastTimeStamp !== null ? true : false;
};

module.exports = async () => {
	let keyExist = await doKeysExist();
	return new Promise(async (resolve, reject) => {
		if (keyExist) {
			resolve({
				public: keygen.getLastPublicKey(),
				private: keygen.getLastPrivateKey(),
			});
		} else {
			let keys = await keygen.generateKeys();
			resolve(keys);
		}
	});
};
