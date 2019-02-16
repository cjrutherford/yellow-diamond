require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	dbPort: process.env.DB_PORT || 27017,
	dbUrl: process.env.DB_URL || 'localhost',
	dbCollection: process.env.DB_COLLECTION || 'yellow-diamond',
	dbUser: process.env.DB_USER || 'user',
	dbPass: process.env.DB_PASS || '$0m3th1ng$T3rr1blyR0t3n!@#',
};
