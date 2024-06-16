import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import Doctor from "../../models/Doctor.js";

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id; // Use `id` as per the token payload
        req.role = decoded.role;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId
    let user = await User.findById(userId) || await Doctor.findById(userId)
    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You are not authorized" })
    }
    next();
}