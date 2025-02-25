import express from "express";
import {
  createQuizz,
  readAllQuizzes,
  readQuizz,
  joinQuizz,
  leaveQuizz,
} from "../controllers/quizzController.js";

import authenticateUser from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validate.js";
import { quizzValidationRules } from "../validationRules.js";

const quizzRouter = express.Router();

quizzRouter.post(
  "/quizzes",
  quizzValidationRules.createQuizz,
  validateRequest,
  createQuizz
);
quizzRouter.get("/quizzes", readAllQuizzes);
quizzRouter.get(
  "/quizzes/:id",
  quizzValidationRules.readQuizz,
  validateRequest,
  readQuizz
);
quizzRouter.post(
  "/quizzes/join/:id",
  quizzValidationRules.joinQuizz,
  validateRequest,
  authenticateUser,
  joinQuizz
);
quizzRouter.post(
  "/quizzes/leave/:id",
  quizzValidationRules.leaveQuizz,
  validateRequest,
  authenticateUser,
  leaveQuizz
);

export default quizzRouter;
