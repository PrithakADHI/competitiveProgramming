import express from "express";
import { loginAdmin, viewAllUsers } from "../controllers/adminController.js";
import { validateRequest } from "../middlewares/validate.js";
import { userValidationRules } from "../validationRules.js";

import authenticateUser, { adminAuth } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post(
  "/login",
  userValidationRules.loginUser,
  validateRequest,
  loginAdmin
);
adminRouter.get("/users", authenticateUser, adminAuth, viewAllUsers);

export default adminRouter;
