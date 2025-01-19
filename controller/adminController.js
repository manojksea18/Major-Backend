const Admin = require("../model/admin");
// const ApiError = require("../utils/ApiError");
// const ApiResponse = require("../utils/ApiResponse");



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
        const adminn = await Admin.findById(req.params.id);
    if (!adminn){
        return res.status(400).json({message: "Admin not found"});
    } 
    return res.status(200).json(adminn); 
 }
 catch(error){
    res.status(500).json({message: "Error finding Admin"});
 }
}

module.exports= {
    addAdmin,
    getAll,
    getById,
}; // Export as part of an object
