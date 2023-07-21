const mongoose = require('mongoose');

const BlogCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image_filename: {
    type: String,
    required: true,
  },
  blogType: {
    type: String,
    required: true,
  },
});

module.exports = BlogCategory = mongoose.model('blogCategory', BlogCategorySchema);
