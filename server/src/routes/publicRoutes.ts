import { Router } from "express";
import { getUserProfileByUsername } from "../controllers/publicController";
import errorCatch from "../lib/utils/errorCatch";

const publicRouter = Router();

publicRouter.get(
  "/userprofile/:username",
  errorCatch(getUserProfileByUsername)
);

export default publicRouter;
