const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Add user payload to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = authenticateUser;
