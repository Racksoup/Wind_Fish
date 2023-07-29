const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authProvider: {
    type: String, 
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
