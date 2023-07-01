const express = require('express');
const yup = require('yup');
const UserSchema = require('../../models/authModels/userShema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const validationSchema = yup.object().shape({
    email: yup.string().required().email('Invalid email format'),
    password: yup.string().required().min(5, 'Password is too short')
  });

const loginController = async  (req, res) => {

   
  try {
    await validationSchema.validate(req.body);
    const isExisting = await UserSchema.findOne({email: req.body.email});

    const generateKey = crypto.randomBytes(64).toString('hex');
  

    if (!isExisting ) {
       return res.status(400).send("User does not exist")
    }

   

    const isPasswordMatch = await bcrypt.compare(req.body.password, isExisting.password);
 

    if(isPasswordMatch) {

      if(isExisting.isVerified === false) {
        return   res.status(500).json({message:"This email has not been verified"})
       }

        const auth = jwt.sign(
        {
            userId: isExisting._id, 
            email: isExisting.email
        },
        generateKey,
        {expiresIn: '1h'}
        )
     
        return  res.status(200).json({
            message: "loged in successfully",
            jwtToken: auth,
            user: {
                userId: isExisting._id, 
                email: isExisting.email
            }
        })
    }

    return  res.status(400).json({
        error: 'Incorrect password'
    })

   

  } catch ( err  ) {
    res.status(400).send(err.message)
  }
    
    

}

module.exports = loginController

