const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("./model/user");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/manasa');
        console.log('connected to DB');
        return true;
    } catch (err) {
        console.log(`failed to connect with the database with err: ${err.message}`);
        return false;
    }
}

connectDb();

app.post("/register", async (req, res) => {

    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
       
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        res.status(409).send("User Already Exist. Please Login");
      }
   
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign({ user_id: user._id, email },
        process.env.JWK_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });


  // Login
app.post("/login", async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWK_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });


app.listen(process.env.PORT | port);
