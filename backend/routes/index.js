import express from 'express';
import authRouter from './auth/authRouter.js';
import chatRoutes from './message/chatRoutes.js';

const route = express.Router();

route.use("/auth",authRouter)
route.use("/chat",chatRoutes)

export default route;