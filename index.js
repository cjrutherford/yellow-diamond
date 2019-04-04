const express = require('express');
const log = require('./logger');
const cp = require('cookie-parser');
const bp = require('body-parser');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const corsOptions = {
  origin: '*',
};

const app = express();

const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || 'localhost';
const dbCollection = process.env.DB_COLLECTION || 'nodebook';
const dbUser = process.env.DB_USER || 'user';
const dbPass = process.env.DB_PASS || '$0m3th1ng$T3rr1blyR0t3n!@#';
const appSecret =
  process.env.APP_SECRET || '018347691!#$^@#%^@ajosr haguqhfwiasbd';
////Need to add database user and collection information for the connection.
mongoose.set('useCreateIndex', true);
mongoose
  .connect(`mongodb://${dbUser}:${dbPass}@${dbUrl}:${dbPort}/${dbCollection}`, {
    useNewUrlParser: true,
  })
  .then(() => log.info('Connected Successfully to MongoDB'))
  .catch(err => log.error(err));

app.use(passport.initialize());

require('./util/genKeys')
  .obtainKeys()
  .then(keys => {
    require('./passport-config')(passport, keys.public, appSecret);

    app.use(cors(corsOptions));
    app.use(cp());
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.use((req, res, next) => {
      if (req.body) log.info(req.body);
      if (req.params) log.info(req.params);
      if (req.query) log.info(req.query);
      log.info(
        `Received a ${req.method} request from ${req.ip} for ${req.url}`,
      );
      next();
    });
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use('/users', require('./routes/user')(keys.private));
    app.use(
      '/application',
      require('./routes/application')(appSecret, keys.public),
    );

    app.listen(port, err => {
      if (err) log.error(err);
      log.info(`Listening for Requests on Port: ${port}.`);
    });
  })
  .catch(err => log.error(err));
