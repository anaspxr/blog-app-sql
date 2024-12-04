import { Router } from "express";
import pool from "../configs/db";
import { userLogin, userRegister } from "../controllers/userControllers";
import errorCatch from "../lib/utils/errorCatch";
import { registerSchema } from "../lib/validationSchemas/userValidate";

const userRouter = Router();

userRouter.post("/register", errorCatch(userRegister));
userRouter.post("/login", errorCatch(userLogin));

export default userRouter;
