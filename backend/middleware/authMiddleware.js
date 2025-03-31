import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticateToken = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
       try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
       } catch (error) {
        throw new Error("Not authorized, token is invalid");
       }
    }
}