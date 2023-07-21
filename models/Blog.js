const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: Array,
    required: true,
  },
  image_filename: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
  },
  tags: {
    type: Array,
  },
  link: {
    type: String,
  },
  caption: {
    type: String,
  },
  blogtype: {
    type: String,
    required: true,
  },
});

module.exports = Blog = mongoose.model('blog', BlogSchema);
