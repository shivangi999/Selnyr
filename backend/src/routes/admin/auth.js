const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { ValidateSignupRequest, ValidateSigninRequest } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();


router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
// router.post('/admin/signout', signout);


module.exports = router;
