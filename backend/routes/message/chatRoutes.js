import express from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import chatController from "../../controller/message/chatController.js";

const route = express.Router();

route.post("/",authenticateToken,chatController.accessChat);
route.get("/",authenticateToken,chatController.fetchChat);
route.post("/group",authenticateToken,chatController.createGroupChat);
route.put("/rename",authenticateToken,chatController.renameGroup);
route.put("/removeFromGroup",authenticateToken,chatController.removeFromGroup);
route.put("/addFromGroup",authenticateToken,chatController.addFromGroup);

export default route;