const express = require("express");
const router = express.Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validateSignupRequest, validateSigninRequest } = require('../validators/auth');
const nanoid = require('nanoid');



// const generateJwtToken = (_id, role) => {
//   return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
// };

//Register controller
exports.signup = (req, res) => {

  //validation of User Rregister
// console.log(req.body);
  const { errors, isValid } = validateSignupRequest(req.body);


  //check inputs are valid or not
  if(!isValid) {
    return res.status(400).json(errors);
  }

//check if user exists or not
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {

      return res.status(400).json({
        email: "User already registered",
      });

    }
    else {

      //create new users
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: nanoid(),
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: 'user',
      });


      //Hash PAssword before saving in Database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));

        });
      });

    }


    });


};


// Login Controller
exports.signin = (req, res) => {


  // console.log(req.body);
    //Form validation
  const { errors, isValid } = validateSigninRequest(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;


    User.findOne({ email: email }).then(user => {

      //Check if user exists
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found"});
        }

        //check PAssword
        bcrypt.compare(password, user.password).then(isMatch => {
          if(isMatch) {
            //user matched

            //create jwt payload
            const payload = {
                id: user.id,
                name: user.name,
                role: user.role
            };
            const { _id, name, email, phone, role} = user;

            //Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 //1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  user: { _id, name, email, phone, role},
                });
              }
            );
          } else {
            return res
                  .status(400)
                  .json({ passwordincorrect: "Password Incorrect"});
          }
        });
    });
};
