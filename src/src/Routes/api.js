const express = require("express");
const UsersController=require('../Controller/usersController');
const jwtAuth = require("../Middleware/jwtAuth");
const router = express.Router();

const {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
  } = require("../Controller/blogController");
  

// signup

router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);

// After Login
router.get("/profile-details",jwtAuth,UsersController.profileDetails)



  
  //blog router endpoint
  router.post("create-blog", createBlog);
  router.get("/blogs", getAllBlogs);
  router.get("/blog/:id", getBlogById);
  router.patch("/blog/:id", updateBlog);
  router.delete("/blog/:id", deleteBlog);
  
  module.exports = router;

module.exports = router;