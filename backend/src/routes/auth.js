const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controller/auth');
// const { validateSignupRequest, validateSigninRequest } = require('../validators/auth');
// const {requireSignin} = require("../middleware/index.js");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ValidateSignupRequest = require('../validators/auth');
const nanoid = require('nanoid');

// Register yourself

router.post('/signup', signup);

router.post('/signin', signin);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;
