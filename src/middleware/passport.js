const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models/User');
const config = require('../config');

const configurePassport = () => {
  // Configure the JWT strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret, // Replace with your actual secret key
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        // Find the user based on the provided user ID in the JWT payload
        const user = await User.findById(payload.userId);

        if (user) {
          // If the user is found, authentication is successful
          done(null, user);
        } else {
          // If the user is not found, authentication fails
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    })
  );
};

module.exports = configurePassport;
