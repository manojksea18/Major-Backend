const express = require("express");

const {
    // findById,
    addAdmin,
    // loginAdmin,

}= require("../controller/admin1Controller");
const router = express.Router();


// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);

router.post("/", addAdmin);

// router.post("/login", loginAdmin);

module.exports = router;
