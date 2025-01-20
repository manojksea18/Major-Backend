require("dotenv").config(); //Load environment variables from the .env file

const express = require("express");
const cors = require("cors"); // Import the CORS package
const connectDB = require("./config/db"); //Database connection module
const adminRoutes = require("./routes/adminRoutes"); //Admin routes

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors(
    {origin: "http://localhost:3000"}
)); // This will allow all origins by default


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


const port = 8080;
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

});