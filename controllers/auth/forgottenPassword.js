const express = require('express');
const app = express();
const UserModel = require('../../models/authModels/userSchema');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const resetPassword = async (req, res) => {
  const { email } = req.email;
  const isAvailable = await UserModel.findOne({ email: email }).exec();

  const checkEmail = !!isAvailable;

  if (!isAvailable) {
    return res.status(500).json({ message: 'Email not found' });
  }

  if (!isAvailable.isVerified) {
    return res.status(403).json({ message: 'Email is not verified' });
  }

  if (checkEmail) {
    // Generate token and send confirmation email
    // ...

    return res.status(200).json({ message: 'we sent a confirmation email' });
  }
};

module.exports = resetPassword;
