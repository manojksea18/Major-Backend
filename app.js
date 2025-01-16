require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/admin/", adminRoutes);

const port = 8080;
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

});