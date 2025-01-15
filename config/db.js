const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Major-Project"
    );
    console.log("DB Conected");
  } catch (exception) {
    console.log("DB Connection Error" + exception);
  }
};

module.exports = connectDB;