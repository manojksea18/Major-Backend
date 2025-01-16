// // 
// const User = require("../model/admin");
// const jwt = require("jsonwebtoken");
// const ApiError = require("../utils/ApiError");
// const Admin = require("../model/admin");
// const ApiResponse = require("../utils/ApiResponse");

// const generateAccessAndRefreshTokens  = async (userId)=>{
//     try {
//         console.log("Generating tokens for userId:", userId);
//         const user = await User.findById(userId);


//         //Debug environment variables
//     console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
//     console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN-SECRET);
//     console.log("ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);
//     console.log("REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY);

//     //Generate tokens
//     console.log("Generating refresh token...");
//     const refreshToken = user.generateRefreshToken();

//     console.log("Generating access token...");
//     const accessToken = user.generateAccessToken();

//     console.log("Saving refresh token to user...");
//     customer.refreshToken = refreshToken;

//     //save the customer with updated refresh token 
//     await customer.save();

//     console.log("Tokens generated successfully:",{
//         accessToken,
//         refreshToken,
//     });
    
//     return { accessToken, refreshToken};
//     }
//     catch(error){
//         throw new ApiError(
//             500,
//             "Something went wrong while generating refresh and access token"
//         )
        
//     }

// }

// const findById = async (req, res) => {
//     try{
//         const admin = await Admin.findById(req.params.id);
//         if (!admin) {
//             return res.status(404).json({message:" Admin not found"});
//         }
//         return res.status(200).json(admin);
//     }
//     catch(err){
//         res.status(500).json({message:"Error finding admin"});
//     }
// };

// const addAdmin = async( req, res) =>{

//    console.log(req.body.email);
//    const {
//     username,
//     email,
//     status,
//     password,

//    }=req.body;

//    if (
//     [
//         username ||
//         email ||
//         status ||
//         password,
//     ] .some((field) => field?.trim() ==="")
//    ){
//     throw new ApiError(400, "All fields are required");
//    }

//    const existedAdmin = await Admin.findOne({
//     $or : [{contact}, {email}],
//    });

//    if (existedAdmin){
//     throw new ApiError(409, "User with email or phone already exists");

//    }

//    let profileImageLocalPath = req.file?.path;
//    console.log(profileImageLocalPath);

//    const user = await Admin.create({
//     email,
//     contact,
//     password,
//     first_name,
//     last_name,
//     gender,
//     date_of_birth,
//     picture:profileImageLocalPath,

//    });

//    const createdAmin = await Admin.findById(user._id);
//    if(!createdAmin){
//     throw new ApiError(500, "Something went wrong while registering the admin");

//    }
//    return res
//    .status(201)
//    .json(new ApiResponse(200, createdAmin, "Admin registered successfully"));
   
// };


// const loginAdmin = async (req, res) => {
//     try{
//         //Log the request body for debugging
//         console.log("Login Request Body:", req.body);
//         const {email, contact, password} = req.body;


//         //Validate input
//         if (!password){
//             return res
//             .status(400)
//             .json(new ApiResponse(400, null, "Password is required"));

//         }

//         if(!(email || contact)){
//             return res
//             .status(400)
//             .json(new ApiResponse(400, null, "Email or contact is required"));

//         }

//         //sanitize and trim inputs

//         const sanitizedEmail = email?.trim();
//         const sanitizedContact = contact?.trim();


//         //Find the user in the database

//         const admin = await Admin.findOne({
//             $or : [{email: sanitizedEmail}, {contact:sanitizedContact}],
//         });


//         if(!Admin){
//             return res
//             .status(404)
//             .json(new ApiResponse(404, null, "Admin does not exist"));

//         }

//         //Validate password
//         const isPasswordValid = await admin.isPasswordCorrect(password);
//         if (!isPasswordValid){
//             return res
//             .status(401)
//             .json(new ApiResponse(401, null, "Invalid user credentails"));

//         }

//         // Generate tokens
//         const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(
//             admin._id
//         );

//         // Exclude sensitive fields
//         const loggedInAdmin = await Admin.findById(admin._id).select(
//             "-password - refreshToken"
//         );

//         //set cookie options
//         const cookieOptions = {
//             httpOnly: true,
//             secure : process.env.NODE_ENV === "production", // secure only in production
//             sameSite: "Strict", // prevent CSRF

//         };

//         // Respond with tokens and user data 

//         return res
//         .status(200)
//         .cookie("accessToken", accessToken,cookieOptions)
//         .cookie("refreshToken", refreshToken, cookieOptions)
//         .json(
//             new ApiResponse(
//                 200,
//                 {
//                     admin :loggedInAdmin,
//                     accessToken,
//                     refreshToken,
//                 },
//                 "admin logged in successfully"
//             )
//         );

//     } catch(error){
//         console.error("Error in loginAdmin:", error.message);
//         return res
//         .status(500)
//         .json(
//             new ApiResponse(
//                 500,
//                 null,
//                 "An error occured during login" + error.message
//             )
//         );
//     }
// }

// module.exports={
//     findById,
//     addAdmin,
//     loginAdmin,
// }


