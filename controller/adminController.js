// 
const User = require("../model/admin");
const jwt = require("jsonwebtoken");

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
        
    }

}



