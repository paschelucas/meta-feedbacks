import express from "express";
import UserBusiness from "../business/UserBusiness";
import UserController from "../controller/UserController";
import UserDatabase from "../data/UserDatabase";
import { IdGenerator } from "../services/generateId";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export const userRouter = express.Router();

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new HashManager()
)
const userController = new UserController(userBusiness);

userRouter.get("", userController.getAllUsers)
userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.login)
userRouter.put("/role", userController.editUserRole)
userRouter.put("/password", userController.editPassword)