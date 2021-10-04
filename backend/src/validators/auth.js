// const { check, validationResult } = require('express-validator');
const Validator = require("validator");
const isEmpty = require("is-empty");


//Validation for SIGNUP

module.exports = function ValidateSignupRequest(data){
    let errors = {};



    // Console log to print data
      console.log(data);


    //Convert empty Fields to an empty string so we can use validator finctions
      data.firstName = !isEmpty(data.firstName) ? data.firstName :  "";
      data.lastName = !isEmpty(data.lastName) ? data.lastName :  "";
      data.email = !isEmpty(data.email) ? data.email : "";
      data.phone = !isEmpty(data.phone) ? data.phone : "";
      data.password = !isEmpty(data.password) ? data.password : "";

    //First Name Checks
      if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
      }

    //Last Name Checks
      if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
      }

    //Email Checks
      if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      }
      else if (!Validator.isEmail(data.email))
      {
        errors.email = "Email is Invalid";
      }

    //Phone Number Checks
      if (Validator.isEmpty(data.phone)){
        errors.phone = "Phone Number is required";
      }

    //Password Checks
      if (Validator.isEmpty(data.password)){
        errors.password = "Password is required";
      }


    //Confirm Password Checks
      if (Validator.isEmpty(data.confirm_password)){
        errors.confirm_password = "Confirm Password is required";
      }

    //Length Of PAssword Checks
      if (!Validator.isLength(data.password, { min: 6, max: 20})){
        errors.password = "Password must be at least 6 characters";
      }

    //Alphanumeric in Password Checks
      if (!Validator.isAlphanumeric(data.password)) {
          errors.password = "Password should contain at least 1 Numeric Value";
        }

    //Checks If Password and Confirm_password is equal
      if (!Validator.equals(data.password, data.confirm_password)){
        errors.confirm_password = "Passwords must match";
      }

    // If Errors are done
      return {
        errors,
        isValid: isEmpty(errors)
      };

};

module.exports = function ValidateSigninRequest(data){
  let errors = {};
  // console.log(data);

      //Convert empty Fields to an empty string so we can use validator finctions

      // check if email and password is empty or not
      data.email = !isEmpty(data.email) ? data.email : "";
      data.password = !isEmpty(data.password) ? data.password : "";

      //Email Checks
      if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      }
      else if (!Validator.isEmail(data.email))
      {
        errors.email = "Email is Invalid";
      }

      //Password Checks
      if (Validator.isEmpty(data.password)){
        errors.password = "Password is required";
      }



      return {
        errors,
        isValid: isEmpty(errors)
      };
};

//
// exports.validateSigninRequest = [
//     check('email')
//     .isEmail()
//     .withMessage('Valid Email is required'),
//     check('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 character long')
// ];
