const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "12345"; // Use environment variable for SECRET_KEY

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY); // Verify the token
    req.user = verified; // Attach user data to the request object
    next(); // Pass control to the next middleware
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;
