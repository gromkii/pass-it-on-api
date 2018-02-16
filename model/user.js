const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  password: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
