const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const log = require("./logger");
require("dotenv").config();
const KeyPair = require('./models/keyPair');
const User = require("./models/user");

module.exports = (passport, key) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: key
  };
   passport.use(
     new JwtStrategy(opts, (payload, done) => {
       log.info({message: 'verifying the token', payload});
       User.findById(payload.id)
         .then(user => {
           if (user) {
             return done(null, {
               id: user._id,
               name: user.userName,
               email: user.emailAddress
             });
           }
           log.info(payload);
           return done(null, false);
         })
         .catch(err => {
           log.error(err)
           return done('Unauthorized', false, payload);
          });
     })
   );
};
