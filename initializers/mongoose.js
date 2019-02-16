const mongoose = require('mongoose');
const log = require('../logger');

module.exports = config => {
	return new Promise((resolve, reject) => {
		try {
			const { dbUser, dbPass, dbUrl, dbPort, dbCollection } = config;
			mongoose.set('useCreateIndex', true);
			mongoose
				.connect(
					`mongodb://${dbUser}:${dbPass}@${dbUrl}:${dbPort}/${dbCollection}`,
					{
						useNewUrlParser: true,
					}
				)
				.then(() => {
					// log.info('Connected Successfully to MongoDB');
					resolve('Connected Successfully to MongoDB');
				})
				.catch(err => reject(err));
		} catch (e) {
			log.error(e);
		}
	});
};
