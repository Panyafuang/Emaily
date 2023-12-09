const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require('mongoose');

const keys = require('../config/key');

/** Pull a model out of mongoose */
const User = mongoose.model('User');


/** Call serializeUser with the user to generate the identifying piece of info, And then passport will eventually stuff that into a cookie. */
passport.serializeUser((user, done) => {
  /**
   * 2 arguments
   * null = error
   * user.id = identifying piece of information that is going to identify the user and follow 
   * up requests. user.id ในที่นี่คือ id จาก mongoDB.
   * Why we're using this mongo to identifier rather that profile.id, The reason is that we can very easily be making use of multiple different authentication provider. we might have google sign in, facebook sign in, etc.
   */
  done(null, user.id);
});



/** Take the user id that we had stuffed in the cookie and turn it back into an actual user model. And add to req.user Its coming from Passport, specifically from the 'app.use(passport())' middleware*/
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});



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
      proxy: true
    },
    /**
     * 
     * @param {*} accessToken automatically expires after some amount of time.
     * @param {*} refreshToken allow us to refresh accessToken.
     * @param {*} profile google account profile.
     * @param {*} done call done function to tell passport that we have now finished.
     */
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        // We already have a record with the given profile ID
        /** 2 argument (error, user) */
        return done(null, existingUser);
      }

      // We don't have a user record with this ID, make a new record
      /** Create record or model instance */
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);