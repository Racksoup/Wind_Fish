const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.ObjectId,
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
