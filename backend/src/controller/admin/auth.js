const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../../../config/key");
const ValidateSignupRequest = require('../../validators/auth');
const ValidateSigninRequest  = require('../../validators/auth');

// Nanoid is used to generate the 
const nanoid = require('nanoid');


//Register controller
exports.signup = (req, res) => {

  //validation of User Rregister
  const { errors, isValid } = ValidateSignupRequest(req.body);


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
        role: 'admin',
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



//login controller for admin
exports.signin = (req, res) => {

  //validation of User Register

  // console.log(req.body);
  const { errors, isValid } = ValidateSigninRequest(req.body);


  //check inputs are valid or not
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // Email and Password of the admin login

  // email value
  const email = req.body.email;
  // password value
  const password = req.body.password;


  User.findOne({ email }).then(user => {

    //Check if user exists
      if (!user) {
        return res.status(404).json({ email: "Your email is not found"});
      }

      //check PAssword
      bcrypt.compare(password, user.password).then(isMatch => {

        // User is Matched or Not
        if(isMatch) {
          //user matched

          // Role is Admin
          if(user.role == 'admin')
          {

                      //Create Jwt Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            role: user.role
                        };

                      // Create Variable From User Model
                        const { _id, name, email, phone, role} = user;

                      //Sign Token
                        jwt.sign(
                          payload,
                          keys.secretOrKey,
                          {
                            expiresIn: 31556926  //1 year in seconds
                          },
                          (err, token) => {
                            res.json({
                              success: true,
                              token: "Bearer " + token,
                              user: { _id, name, email, phone, role},
                            });
                          }
                        );
          }
          else{

            // If It is not an admin
              res.status(300).json({ email : "You are not an Admin"});
          }


        } else {
          return res
                .status(400)
                .json({ passwordincorrect: "Password Incorrect"});
        }
      });
  });

};

//
// exports.signin = (req, res) => {
//   User.findOne({ email: req.body.email }).exec(async (error, user) => {
//     if (error) return res.status(400).json({ error });
//     if (user) {
//       const isPassword = await user.authenticate(req.body.password);
//       if (
//         isPassword &&
//         (user.role === "admin" || user.role === "super-admin")
//       ) {
//         const token = jwt.sign(
//           { _id: user._id, role: user.role },
//           process.env.JWT_SECRET,
//           { expiresIn: "1d" }
//         );
//         const { _id, firstName, lastName, email, role, fullName } = user;
//         res.cookie("token", token, { expiresIn: "1d" });
//         res.status(200).json({
//           token,
//           user: { _id, firstName, lastName, email, role, fullName },
//         });
//       } else {
//         return res.status(400).json({
//           message: "Invalid Password",
//         });
//       }
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   });
// };

 exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     message: "Signout successfully...!",
//   });
};
