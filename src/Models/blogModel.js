const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      split: true,
    },
    description: {
      type: String,
      require: true,
      split: true,
    },
    author: {
      type: String,
      require: true,
      split: true,
    },
    image: [
      {
        publicID: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const Blog = mongoose.model("Blogs", blogSchema);
module.exports = Blog;