// 
const User = require("../model/admin");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const Admin = require("../model/admin");
const ApiResponse = require("../utils/ApiResponse");

const generateAccessAndRefreshTokens  = async (userId)=>{
    try {
        console.log("Generating tokens for userId:", userId);
        const user = await User.findById(userId);


        //Debug environment variables
    console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
    console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN-SECRET);
    console.log("ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);
    console.log("REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY);

    //Generate tokens
    console.log("Generating refresh token...");
    const refreshToken = user.generateRefreshToken();

    console.log("Generating access token...");
    const accessToken = user.generateAccessToken();

    console.log("Saving refresh token to user...");
    customer.refreshToken = refreshToken;

    //save the customer with updated refresh token 
    await customer.save();

    console.log("Tokens generated successfully:",{
        accessToken,
        refreshToken,
    });
    
    return { accessToken, refreshToken};
    }
    catch(error){
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        )
        
    }

}

const findById = async (req, res) => {
    try{
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({message:" Admin not found"});
        }
        return res.status(200).json(admin);
    }
    catch(err){
        res.status(500).json({message:"Error finding admin"});
    }
};

const addAdmin = async( req, res) =>{

   console.log(req.body.email);
   const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    email,
    contact,
    password,

   }=req.body;

   if (
    [
        first_name ||
        last_name ||
        gender ||
        date_of_birth ||
        email ||
        contact ||
        password,
    ] .some((field) => field?.trim() ==="")
   ){
    throw new ApiError(400, "All fields are required");
   }

   const existedAdmin = await Admin.findOne({
    $or : [{contact}, {email}],
   });

   if (existedAdmin){
    throw new ApiError(409, "User with email or phone already exists");

   }

   let profileImageLocalPath = req.file?.path;
   console.log(profileImageLocalPath);

   const user = await Admin.create({
    email,
    contact,
    password,
    first_name,
    last_name,
    gender,
    date_of_birth,
    picture:profileImageLocalPath,

   });

   const createdAmin = await Admin.findById(user._id);
   if(!createdAmin){
    throw new ApiError(500, "Something went wrong while registering the admin");

   }
   return res
   .status(201)
   .json(new ApiResponse(200, createdAmin, "Admin registered successfully"));
   
}


