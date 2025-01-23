const express = require("express");
const router = express.Router();
const mid = require("../middlewares/auth_middlware")

const {
    addAdmin,
    getAll,
    getById,
    login,
    updateAdmin,


} = require("../controller/adminController");
const authenticateToken = require("../middlewares/auth_middlware");


// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);
// router.post("/login", loginAdmin);

router.post("/add", addAdmin);
router.post("/login", login, authenticateToken);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/update/:adminId", updateAdmin);




module.exports = router;
