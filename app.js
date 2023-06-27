// Basic module

const dotenv = require('dotenv')
const express = require("express");
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
app.use(bcrypt);




// Mongo DB connect
