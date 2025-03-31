import express from "express";
import authController from "../../controller/auth/authController.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";

const route = express.Router();

route.post('/createUser',authController.register);
route.get('/login',authController.login);
route.get('/allUsers',authenticateToken,authController.allUsers);

export default route;