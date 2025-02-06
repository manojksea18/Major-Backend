const express = require("express");
const router = express.Router();
const mid = require("../middlewares/auth_middlware")

const {
    addAdmin,
    getAll,
    getById,
    login,
    updateAdmin,
    logout,


} = require("../controller/adminController");
const authenticateToken = require("../middlewares/auth_middlware");
const getIdFromToken = require("../utils/getIdFromToken");


// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);
// router.post("/login", loginAdmin);

router.post("/add", addAdmin);
router.post("/login", login);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/update/:adminId", updateAdmin);
router.get("/getIdFromToken",getIdFromToken)




module.exports = router;
