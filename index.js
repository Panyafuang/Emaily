const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var cors = require('cors');

const keys = require('./config/key');

/** Just want to make this sure that file is executed.  */
require('./models/user.model');
require('./services/passport.service');


mongoose.connect(keys.mongo.uri);

const app = express();
app.use(cors());
/** Tell express we gonna use cookie */
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  keys: [keys.cookie.key]
}));


/** Tell passport that is should make use of cookie to handle authentication. */
app.use(passport.initialize());
app.use(passport.session());


// ─── Route Handler ───────────────────────────────────────────────────────────
/**
 * require('./routes/auth.route'); return function and immediately call that function with that app * object.
 */
require('./routes/auth.route')(app);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
