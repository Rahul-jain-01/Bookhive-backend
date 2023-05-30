const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/index');

router.post('/register', authController.signUpController);
router.post('/login', authController.loginController);

module.exports = router;
