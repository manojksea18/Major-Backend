require("dotenv").config(); //Load environment variables from the .env file

const express = require("express");
const cors = require("cors"); // Import the CORS package
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']; // Add your frontend URL here
const connectDB = require("./config/db"); //Database connection module
const adminRoutes = require("./routes/adminRoutes"); //Admin routes
const app = express();
var jwt = require('jsonwebtoken');

// Use CORS middleware to allow cross-origin requests
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);  // Allow the request
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
})); // This will allow all origins by default


//connect to the database
connectDB();

//Middleware to pasrse JSON requests

//Logging middleware for debugging requests
// app.use((req, res, next) => {
    //     console.log(`${req.method} ${req.url}`);
    //     next();
    // });

app.use(express.json());

//Admin routes
app.use("/admin", adminRoutes);
app.use("/helper/getId", (req,res)=>{
  const token = req.query.token; // Extract token from URL query parameters
  console.log(token)  
  if (!token) {
      return res.status(401).send("Access Denied: No token provided");
    }
    try {
      console.log("Essss")
      const verified = jwt.verify(token,"12345"); // Verify the token
      console.log(verified)
      req.user = verified; // Attach user data to the request object
      console.log(req.user);
      res.status(200).send(req.user);
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
});


const port = 8080;
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

});