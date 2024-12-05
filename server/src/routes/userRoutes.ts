import { Router } from "express";
import {
  getOwnProfile,
  userLogin,
  userRegister,
} from "../controllers/userControllers";
import errorCatch from "../lib/utils/errorCatch";
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.post("/register", errorCatch(userRegister));
userRouter.post("/login", errorCatch(userLogin));

userRouter.use(verifyToken);

userRouter.get("/profile", errorCatch(getOwnProfile));

export default userRouter;
