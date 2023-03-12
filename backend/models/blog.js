const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true
    },
    cover_image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author_name: {
      type: String,
      required: true
    },
    author_description: {
      type: String,
      required: true
    },
  });
  
  const Blog = mongoose.model("Blog", blogSchema);
  
  module.exports = Blog;