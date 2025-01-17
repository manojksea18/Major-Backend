require("dotenv").config(); //Load environment variables from the .env file

const express = require("express");
const connectDB = require("./config/db"); //Database connection module
const adminRoutes = require("./routes/adminRoutes"); //Admin routes

const app = express();

//connect to the database
connectDB();

//Middleware to pasrse JSON requests
app.use(express.json());

//Logging middleware for debugging requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });


//Admin routes
app.use("/admin", adminRoutes);
app.use("/admin", ()=>console.log("hi"));


const port = 8080;
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

});