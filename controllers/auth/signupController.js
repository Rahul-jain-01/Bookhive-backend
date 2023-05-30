const yup = require("yup");
const UserSchema = require('../../models/authModels/userShema');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Plunk = require('@plunk/node').default; 

const plunk = new Plunk('sk_8455c44d30b6bc5f2d05400e1c46c25bfa7201f862785a85'); 

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup.string().oneOf([yup.ref('password'), null],
   'Confirm password does not match').required(),
});

const signUpController = async (req, res) => {

 
  try {
    await validationSchema.validate(req.body);
    const jwtString = crypto.randomBytes(64).toString('hex');
    const isExisted = await UserSchema.findOne({ email: req.body.email });
   
    if (isExisted) {
      return res.status(400).send('This email already exists');
    }
 

    const { email, first_name, last_name, password, confirm_password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const hashConfirmPassword = await bcrypt.hash(confirm_password, 10);

    const addUser = new UserSchema({
      email,
      first_name,
      last_name,
      password: hashPassword,
      confirm_password: hashConfirmPassword,
    });

    await addUser.save();

    const authToken = jwt.sign({email: email, first_name: first_name } , 
        jwtString, 
        {expiresIn: '1h'}  
      )

      await plunk.emails.send({
        to: email,
        subject: 'Welcome to Bookhive',
        body: `
        
        <img src='https://res.cloudinary.com/dhdqt4xwu/image/upload/v1684939754/bookhive/logo_xiwu2l.svg' alt='Bookhive logo'/>
        <h2>Welcome to Bookhive!</h2>
        <p>Hi, ${first_name} ${last_name}</p>
        <p>Thank you for joining Bookhive, the open platform where you can unleash your love for books. We are thrilled to have you as part of our vibrant literary community.</p>
        <p>Bookhive offers a wide range of features and opportunities to connect, explore, and engage with fellow book lovers:</p>
        <ul>
          <li>Discover new books and authors through our extensive collection.</li>
          <li>Connect with other book enthusiasts and join engaging discussions.</li>
          <li>Share your thoughts, reviews, and recommendations with the community.</li>
          <li>Participate in book clubs and reading challenges.</li>
          <li>Stay up to date with the latest literary news and events.</li>
        </ul>
        <p>We hope you have a delightful experience on Bookhive. If you have any questions, suggestions, or need assistance, please don't hesitate to reach out to our support team.</p>
        <p>Once again, welcome to Bookhive! Enjoy your journey through the world of books.</p>
        <p>Best regards,</p>
        <p>The Bookhive Team</p>
      `
      })

    return res.status(201).json({
      message: "Your account has been created successfully",
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: isExisted?.email
      }, 
      jwtToken: authToken
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = signUpController;
