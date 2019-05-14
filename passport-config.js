const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const log = require('./logger');
require('dotenv').config();
const KeyPair = require('./models/keyPair');
const Application = require('./models/application').Application;
const User = require('./models/user');

module.exports = (passport, key, appSecret) => {
  const userOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: key,
    algorithm: ['RS256'],
  };
  passport.use(
    new JwtStrategy(userOpts, (payload, done) => {
      log.info({ message: 'verifying the token', payload });
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user._id,
              name: user.userName,
              email: user.emailAddress,
            });
          }
          log.info(payload);
          return done(null, false);
        })
        .catch(err => {
          console.log('Error from passport config line 31');
          log.error(err);
          return done('Unauthorized', false, payload);
        });
    }),
  );

  const appOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: appSecret,
  };
  passport.use(
    'app-jwt',
    new JwtStrategy(appOpts, (payload, done) => {
      Application.findById(payload.id)
        .then(app => {
          if (app) {
            return done(null, {
              id: app._id,
              appName: app.appName,
              users: app.users,
            });
          }
          return done(null, false);
        })
        .catch(err => {
          console.log('Error from passport-config line 52');
          console.dir(err);
          done('Unauthorized', false, err);
        });
    }),
  );
};
