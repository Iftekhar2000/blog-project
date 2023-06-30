// Basic module


const express = require("express");
const route = require("./src/Routes/api")
const app = new express;
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* Security Module */

const helmet = require("helmet");
const bcrypt = require("bcrypt");
const mongoSanitize = require("mongo-sanitize");
const hpp = require("hpp");
const jwt = require("jsonwebtoken");

// Rate limiter

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter);



// Basic module implementation
app.use(multer);
app.use(cors);
app.use(bodyParser);


// Security module implementation

app.use(helmet);
app.use(hpp);
app.use(mongoSanitize);




// Mongo DB connect

let URI = 'mongodb://127.0.0.1:27017/blog-project';
let OPTION = {user: '', pass:'', autoIndex:true}
mongoose.connect(URI, OPTION);

// Get the default connection
const db = mongoose.connection;

// Event handlers for successful connection and error
db.on('connected', () => {
  console.log('Connected successfully to MongoDB server');
});

db.on('error', (err) => {
  console.error('Failed to connect to MongoDB server', err);
});



  // Routing

  app.use("/api/v1", route)

  // Undefined route


app.use("*",(req,res) => {
	res.status(404).json({status:'fail', data:'not found'})
})

module.exports = app;