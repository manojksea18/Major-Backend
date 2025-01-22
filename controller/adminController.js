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
    const log = await Admin.findOne({username});
    if(!log || !(await bcrypt.compare(password, log.password))){
        return res.status(403).send("Invalid username or password");
    }

      // Generate JWT Token // SECRET_KEY is in auth.js
const token = jwt.sign(
{username:log.username},
"12345",
{
    expires: "1h",
}

);
res.json({token});
}


// const loginCustomer = async (req, res) => {
//     try {
//       // Log the request body for debugging
//       console.log("Login Request Body:", req.body);
  
//       const { email, contact, password } = req.body;
  
//       // Validate input
//       if (!password) {
//         return res
//           .status(400)
//           .json(new ApiResponse(400, null, "Password is required"));
//       }
  
//       if (!(email || contact)) {
//         return res
//           .status(400)
//           .json(new ApiResponse(400, null, "Email or contact is required"));
//       }
  
//       // Sanitize and trim inputs
//       const sanitizedEmail = email?.trim();
//       const sanitizedContact = contact?.trim();
  
//       // Find the user in the database
//       const customer = await Customer.findOne({
//         $or: [{ email: sanitizedEmail }, { contact: sanitizedContact }],
//       });
  
//       if (!customer) {
//         return res
//           .status(404)
//           .json(new ApiResponse(404, null, "User does not exist"));
//       }
  
//       // Validate password
//       const isPasswordValid = await customer.isPasswordCorrect(password);
//       if (!isPasswordValid) {
//         return res
//           .status(401)
//           .json(new ApiResponse(401, null, "Invalid user credentials"));
//       }
  
//       // Generate tokens
//       const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
//         customer._id
//       );
  
//       // Exclude sensitive fields
//       const loggedInUser = await Customer.findById(customer._id).select(
//         "-password -refreshToken"
//       );
  
//       // Set cookie options
//       const cookieOptions = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // Secure only in production
//         sameSite: "Strict", // Prevent CSRF
//       };
  
//       // Respond with tokens and user data
//       return res
//         .status(200)
//         .cookie("accessToken", accessToken, cookieOptions)
//         .cookie("refreshToken", refreshToken, cookieOptions)
//         .json(
//           new ApiResponse(
//             200,
//             {
//               customer: loggedInUser,
//               accessToken,
//               refreshToken,
//             },
//             "User logged in successfully"
//           )
//         );
//     } catch (error) {
//       console.error("Error in loginCustomer:", error.message);
//       return res
//         .status(500)
//         .json(
//           new ApiResponse(
//             500,
//             null,
//             "An error occurred during login: " + error.message
//           )
//         );
//     }
//   };

module.exports= {
    addAdmin,
    getAll,
    getById,
    login,
}; // Export as part of an object
