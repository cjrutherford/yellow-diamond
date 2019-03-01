const { Strategy, ExtractJwt } = require("passport-jwt");
const log = require("./logger");
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const User = require("./models/user");



const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  const secret = require('./util/genKeys').ensureKeys();
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
};
