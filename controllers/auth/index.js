const express = require('express');
const router  = express.Router();

const loginController = require('./loginController');
const signUpController = require('./signupController')



module.exports = {

    loginController: loginController,
    signUpController: signUpController

}