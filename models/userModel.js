const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    unique: true,
    type: String,
    required: true,
    minlength: 5,
  },
  username: {
    unique: true,
    type: String,
    required: true,
    minlength: 3,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', userSchema);
