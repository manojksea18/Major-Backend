const express = require("express");
const router = express.Router();

const {
    addAdmin,

} = require("../controller/adminController");


// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);
// router.post("/login", loginAdmin);

router.post("/add", addAdmin);

module.exports = router;
