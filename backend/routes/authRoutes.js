import express from "express";
import {
  loginUser,
  registerUser,
  refreshAccessToken,
} from "../controllers/authController.js";

import { validateRequest } from "../middlewares/validate.js";
import { userValidationRules } from "../validationRules.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
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

export default authRouter;
