const fs = require('fs');

const promisify = require('util').promisify;

const log = require('../logger');

const mkdir = promisify(fs.mkdir);

module.exports = ensureFolder = (path, mask) => {
	return new Promise((resolve, reject) => {
		log.info(`Ensuring Folder ${path} is created.`);
		if (typeof mask === 'undefined') {
			mask = 0777;
		}
		fs.mkdir(path, mask, err => {
			if (err) {
				if (err.code === 'EEXIST') {
					log.info(`Folder ${path} already exists. Good to Go.`);
					resolve(null);
				}
				log.error(`Error with creating ${path}, with ${err}`);
				reject(err);
			} else {
				log.info(`${path} successfully created.`);
				resolve(null);
			}
		});
	});
};
