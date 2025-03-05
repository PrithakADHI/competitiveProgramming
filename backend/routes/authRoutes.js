import express from "express";
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  profile,
} from "../controllers/authController.js";

import upload from "../middlewares/media.js";
import { validateRequest } from "../middlewares/validate.js";
import { userValidationRules } from "../validationRules.js";
import authenticateUser from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("image"),
  userValidationRules.registerUser,
  validateRequest,
  registerUser
);
authRouter.post(
  "/login",
  userValidationRules.loginUser,
  validateRequest,
  loginUser
);
authRouter.post(
  "/token",
  userValidationRules.refreshAccessToken,
  validateRequest,
  refreshAccessToken
);
authRouter.get("/profile", authenticateUser, profile);

export default authRouter;
