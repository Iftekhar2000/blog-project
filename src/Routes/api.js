const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
} = require("../Controller/BlogController");
const router = require("express").Router();

//blog router endpoint
router.post("create-blog", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.patch("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

module.exports = router;
