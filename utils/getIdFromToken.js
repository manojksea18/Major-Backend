const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "12345"; // Use environment variable for SECRET_KEY

const getIdFromToken = (req, res) => {
  console.log("est")
  const token = req.query.token; // Extract token from URL query parameters
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }
  try {
    const verified = jwt.verify(token,"12345"); // Verify the token
    req.user = verified; // Attach user data to the request object
    console.log(req.user);
    res.status(200).send("Got admin from token");
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = getIdFromToken;

