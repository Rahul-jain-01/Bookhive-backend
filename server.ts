const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter')
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const url = 'mongodb+srv://obiabo:X6ECe8uwkrRNsFKs@bookhive-cluster1.npnarwn.mongodb.net/?retryWrites=true&w=majority'; 
//@ts-ignore
app.get("/", (req, res) => {
  res.send("working endpoint");
});

app.use('/api/v1', authRouter); 

const connectDb = () => {
  try {
    mongoose.connect(url, {useNewUrlParser: true })
    console.log('connected successfully to db')
  } catch ( err ) {
    console.log(err)
  }
}



connectDb();


app.listen(PORT, () => {
  console.log("running on" + " " + PORT);
});
