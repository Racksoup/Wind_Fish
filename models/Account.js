const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
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

module.exports = Account = mongoose.model('account', AccountSchema);
