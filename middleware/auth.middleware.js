import 'dotenv/config';
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    const tokenPart = token.split(" ")[1];

    if (!tokenPart) {
        return res.status(400).json({ message: "Invalid token format" });
    }

    try {
        const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};