import { Router } from "express";
import { adminLogin } from "../controllers/adminController";
import errorCatch from "../lib/utils/errorCatch";

const adminRouter = Router();

adminRouter.post("/login", errorCatch(adminLogin));

export default adminRouter;
