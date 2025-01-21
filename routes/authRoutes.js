const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Admin = require("../model/admin");

const app =express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.post( "/login",async(req,res)=>{
    const{username, password}=req.body;

    try{
         // Find the user by username (ensure the User model is correctly set up)
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    
    }
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });

    
    // Send the token as the response
    res.status(200).json({
        message: "Login successful",
        token, // Send the JWT token
      });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error" });
    }
});