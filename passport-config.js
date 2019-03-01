const { Strategy, ExtractJwt } = require("passport-jwt");
const log = require("./logger");
require("dotenv").config();
const KeyPair = require('./models/keyPair');
const User = require("./models/user");

module.exports = passport => {
 require('./util/genKeys').ensurePublicKey().then(key => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
  };
  // new KeyPair({
  //   public: keys.public,
  //   private: keys.private,
  //   timeOfChange: new Date().now()
  // }).save().then(key => log.info(`Key pair ${key.public} successfully saved.`)).catch(err => log.error(err));
   passport.use(
     new Strategy(opts, (payload, done) => {
       User.findById(payload.id)
         .then(user => {
           if (user) {
             return done(null, {
               id: user.id,
               name: user.name,
               email: user.email
             });
           }
           return done(null, false);
         })
         .catch(err => log.error(err));
     })
   );
 });
};
