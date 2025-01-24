const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["1", "0", "-1"], //1 for Active, 0 for Deactivate, -1 for admin deleted
  },
  refreshToken: {
    type: String,
  },

});

adminSchema.pre("save" , async function(next) {
  if(!this.isModified("password")) return next();
  this.password= await bcrypt.hash(this.password,10);
  next();
  
});

adminSchema.methods.isPasswordCorrect =async function (password) {
  return await bcrypt.compare(password, this.password);
  
};

adminSchema.methods,generateAccessToken = function (){
  return jwt.sign(
    {
      _id: this._id,
      email:this.email,
      username: this.username,
    },
    "12345",
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

adminSchema.methods,generateRefreshToken = function (){
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }

  )
}
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;