const mongoose = require('mongoose');

/** 2 line below are 100% completely equal. */
const Schema = mongoose.Schema;
// const { Schema } = mongoose;


const userSchema = new Schema({
  googleId: String
});

mongoose.model('User', userSchema);