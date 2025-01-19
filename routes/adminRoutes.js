const express = require("express");
const router = express.Router();

const {
    addAdmin,
    getAll,
    getById,

} = require("../controller/adminController");


// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);
// router.post("/login", loginAdmin);

router.post("/add", addAdmin);
router.get("/", getAll);
router.get("/:id", getById);



module.exports = router;
