import express from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get('/',userController.getAllUsers);

export {userRouter};
