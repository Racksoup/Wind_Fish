const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.ObjectId,
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
});

module.exports = Like = mongoose.model('like', LikeSchema);
