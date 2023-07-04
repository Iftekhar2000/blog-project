const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
} = require("../Controller/BlogController");
const { signup, login, getProfile, deleteProfile, changePassword, changeEmail, otpSend, verifyOtp, resetPassword } = require("../Controller/userController");
const router = require("express").Router();

//user router endpoint
router.post("/singup", signup);
router.post("/login", login);
router.get("/profile", getProfile);
router.delete("/profile", deleteProfile);
router.patch("/change-password", changePassword);
router.patch("/change-email", changeEmail);
router.get("/reset-password-otp-send", otpSend);
router.post("/reset-password-otp-verify", verifyOtp);
router.post("/reset-password", resetPassword)

//blog router endpoint
// router.post("/create-blog", createBlog);
// router.get("/blogs", getAllBlogs);
// router.get("/blog/:id", getBlogById);
// router.patch("/blog/:id", updateBlog);
// router.delete("/blog/:id", deleteBlog);

module.exports = router;
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