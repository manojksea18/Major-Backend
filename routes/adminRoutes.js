const express = require("express");
const router = express.Router();

const {
    findById,
    addAdmin,
    loginAdmin,

}= require("../controller/adminController");

router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);

router.post("/", addAdmin);

router.post("/login", loginAdmin);

module.exports = router;
