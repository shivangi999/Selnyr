
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/key");

exports.requireSignin = (req, res, next) => {
  // return "sss";
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
      //
    const user = jwt.verify(token, keys.secretOrKey);
    // console.log(keys.secretOrKey);
    req.user = user;
    // next();
  }
  else{
      return res.status(400).json({ message: "Authorization Required"});
  }
  next();

}

exports.userMiddleware = (req, res, next) => {
  if(req.user.role !== 'user'){
    return res.status(400).json({ message: 'User Access Denied'})
  }
  next();
}

exports.adminMiddleware = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.status(400).json({ message: 'Admin Access Denied'})
  }
  next();
}
