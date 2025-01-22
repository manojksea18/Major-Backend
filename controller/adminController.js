const Admin = require("../model/admin");
// const ApiError = require("../utils/ApiError");
// const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');





const addAdmin = async (req, res) => {
    console.log("addAdmin controller called", req.body);
    try {
        const { username, email, password } = req.body;
         const admin = new Admin({
            username,
            email,
            password,
            status:"1", // Or another appropriate default
            });
        await admin.save();
        res.status(201).send(admin);
    }
    catch (error) {
        console.error("Error during addAdmin:", error);
        res.status(400).send({
        error: "Bad Request",
        message: error.message,
        details: error, //Send the whole object
      });
    }
   
};

const getAll= async(req, res) => {
    try{
        const admin = await Admin.find({});
        if(!admins.length){
            return res.status(400).json({message: "Admin not found"});
            }
            return res.status(200).json(admins);

    }catch(error){
        console.error("Error getting all admins:", error);
        res.status(500).json({message: "Error finding admin"});
    }
};

const getById = async (req, res) => {
    try{
        const admin = await Admin.findById(req.params.id);
    if (!admin){
        return res.status(400).json({message: "Admin not found"});
    } 
    return res.status(200).json(admin); 
 }
 catch(error){
    res.status(500).json({message: "Error finding Admin"});
 }
}
const login = async(req,res)=>{
    const{username, password} =req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try{
    const log = await Admin.findOne({username});
    if (!log) {
        return res.status(403).json({ message: "Invalid username or password" });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, log.password);
    if (!isMatch) {
        return res.status(403).json({ message: "Invalid username or password" });
    }

      // Generate JWT Token // SECRET_KEY is in auth.js
      const token = jwt.sign(
        { username: log.username },
        "12345", // Make sure to use a secure key in production
        { expiresIn: "1h" }
    );

res.status(200).json({ token, message: "Login successful" });
} catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
}
};




module.exports= {
    addAdmin,
    getAll,
    getById,
    login,
}; // Export as part of an object
