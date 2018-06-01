const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../config/database');

module.exports = function(passport){
  let ops = {};
  ops.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  ops.secretOrKey = config.secret;
  passport.use(new JwtStrategy(ops, (jwt_payload, done) => {
    console.warn(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
