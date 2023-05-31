const express = require('express');
const router  = express.Router();

const loginController = require('./loginController');
const signUpController = require('./signupController');
const verifyOtp = require('./verifyOtp');



module.exports = {

    loginController: loginController,
    signUpController: signUpController, 
    verifyOtpController: verifyOtp

}