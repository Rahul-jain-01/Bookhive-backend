const express = require('express');
const UserModel = require('../../models/authModels/userShema');
const Plunk = require('@plunk/node').default;

const plunk = new Plunk('sk_8455c44d30b6bc5f2d05400e1c46c25bfa7201f862785a85'); 
const verifyOtp = async  ( req , res ) => {

    
   try {
    const {otp , email} = req.body;

    const isExisting = await UserModel.findOne({email: req.body.email});
   
    if(!isExisting) {
      return   res.status(400).send('Email is not available')
    }

  

    if(otp === isExisting.otp) {
       
        isExisting.isVerified = true; 
        isExisting.otp = undefined; 
        await isExisting.save();

        // await plunk.emails.send({
        //     to: email,
        //     subject: 'Welcome to Bookhive ',
        //     body: `
            
        //     📚📚
        //     <h1>Congratulations your email has been verified</h1>
        //   `
        //   })
        // return res.status(200).send({message:"Account has been verifed"});
      
     }
 
     
     else {
       return  res.status(400).json({error:"Invalid OTP"})
     }

   } catch ( err ) {
    return res.send(500).json({error:"Server Error"});
   }
}

module.exports = verifyOtp; 

