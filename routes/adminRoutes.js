const express = require("express");
const router = express.Router();

const {
    findById,
    addAdmin,
    loginAdmin,

}= require("../controller/adminController");