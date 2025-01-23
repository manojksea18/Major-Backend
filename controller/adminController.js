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
        const admins = await Admin.find({});
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
};
};

const updateAdmin = async (req,res) =>{
    try{
        const{adminId} = req.params;
        const{ username, email, currentPassword , newPassword} = req.body;


        //validate input        
        if(!username ||  !email){
            return res.status(400).json({success:false, message: "Misssing required fields."});
        }
        console.log("adminId being used:", adminId); 
        // find the admin by ID
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(404).json({success: false, message: "Admin not found." });
        }


        //if a password change is requested , verify the current password
        if (currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, admin.password);
            if(!isMatch){
                return res.status(400).json({success: false, message:"Current password is incorrect."});

            }
            if (newPassword.length<6){
                return res.status(400).json({succcess: false , message :"New password must be at least 6 characters long."});

            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
        }

         // Update other fields
            admin.username = username;
            admin.email = email;

            // save the updated admin data
            await admin.save();

            res.status(200).json({
                success:true,
                message:"Admin updated successfully.",
                data:{
                    username:admin.username,
                    email:admin.email,
                },
            });
    }       catch(err){
            console.error("Error in updateAmin:", err);
            res.status(500).json({ success: false, message:"Internal server error."})

    }

}




module.exports= {
    addAdmin,
    getAll,
    getById,
    login,
    updateAdmin,
}; // Export as part of an object
