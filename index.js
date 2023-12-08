const express = require("express");
const mongoose = require('mongoose');

const keys = require('./config/key');

/** Just want to make this sure that file is executed.  */
require('./models/user.model');
require('./services/passport.service');


mongoose.connect(keys.mongo.uri);

const app = express();


// ─── Route Handler ───────────────────────────────────────────────────────────
/**
 * require('./routes/auth.route'); return function and immediately call that function with that app * object.
 */
require('./routes/auth.route')(app);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
