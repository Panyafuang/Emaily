const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require('mongoose');

const keys = require('../config/key');

/** Pull a model out of mongoose */
const User = mongoose.model('User');




// ─── Inform Passport To Know Google ──────────────────────────────────────────
/**
 * new GoogleStrategy = Create a new instance of the google passport strategy.
 * So this essentially says, Hey application i want to somehow be able to authenticate my user with * google.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id, // can be publish.
      clientSecret: keys.google.client_secret, // keep this thing secret.
      callbackURL: "/auth/google/callback", // URL After user login with google account.
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken -> ', accessToken); // automatically expires after some amount of time.
      console.log('refreshToken -> ', refreshToken); // allow us to refresh accessToken.
      console.log('profile -> ', profile);
      console.log('done -> ', done); // call done function to tell passport that we have now finished.

      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // We already have a record with the given profile ID
            /**
             * 2 argument (error, user)
             */
            done(null, existingUser);
          } else {
            // We don't have a user record with this ID, make a new record
            /** Create record or model instance */
            new User({ googleId: profile.id }).save()
              .then(newUser => {
                done(null, newUser);
              });
          }
        });
    }
  )
);