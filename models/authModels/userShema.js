const mongoose = require('mongoose');
const { boolean } = require('yup');

const schemaForUser = new mongoose.Schema(
    {
        email: {
            type: String, 
            unique: true,
            required: true, 
            trim: true, 
            lowercase: true
        },
        first_name: {
            type: String, 
            trim: true, 
            lowercase: true,
            
        },
        last_name: {
            type: String, 
            trim: true, 
            lowercase: true,
            
        },
        password: {
            type: String, 
            required: true
        }, 
        confirm_password:{
            type: String, 
            required: true
        },
      isVerified: Boolean,
       
    }
)



const UserSchema = mongoose.model('SignUpSchema', schemaForUser); 
module.exports = UserSchema;