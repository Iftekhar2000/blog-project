
//create blog
exports.createBlog = async (req, res) => {
  try {
    //cloudinary setup
    //
    const { title, description, author } = req.body;
    const blog = await new Blog({
      title,
      description,
      author,
    });
    const data = await blog.save();
    res.status(200).json({ message: "Blog create success", data });
  } catch (err) {
    res.status(200).json({ error: "Something went wrong", err });
  }
};
//get all blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    if (blog) {
      res.status(202).json({ message: "Success get blog", blog });
    }
  } catch (err) {
    res.status(200).json({ error: "Failed to get all blog" });
  }
};
//get blog by id
exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const findBlog = await Blog.findById({ _id: blogId });
    if (findBlog) {
      res.status(200).json({ message: "find task by Id", findBlog });
    }
  } catch (err) {
    res.status(200).json({ error: "Failed to get blog by id" });
  }
};
//update task by Id
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const BlogUpdate = await Blog.findByIdAndUpdate(
      { _id: blogId },
      { $set: req.body },
      { new: true }
    );
    await BlogUpdate.save();
    res.status(200).json({ message: "Success update Blog", BlogUpdate });
  } catch (err) {
    res.status(200).json({ error: "Failed to update Blog by id---", err });
  }
};
//delete task by Id
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogDelete = await Blog.findByIdAndDelete({ _id: blogId });
    if (blogDelete) {
      res.status(200).json({ message: "Success delete blog" });
    }
  } catch (err) {
    res.status(200).json({ error: "Failed to delete blog by id" });
  }
};