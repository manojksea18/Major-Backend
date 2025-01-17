import { Router } from "express";

const {
    // findById,
        addAdmin,
    // loginAdmin,

} = require("../controller/admin1Controller");
const adminRoutes = Router()

adminRoutes
    .route("/",addAdmin)

// router.get("/:id", findById);

// router.post("/", upload.single("picture"), addAdmin);


// router.post("/login", loginAdmin);

const adminController = require("../controller/admin1Controller");
console.log(adminController);

module.exports = router;
