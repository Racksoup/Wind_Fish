const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

module.exports = Tag = mongoose.model('tag', TagSchema);
