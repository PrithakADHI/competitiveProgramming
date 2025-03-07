import express from "express";
import {
  createQuizz,
  readAllQuizzes,
  readQuizz,
  increaseUserPoints,
  checkUserAnswer,
} from "../controllers/quizzController.js";

import upload from "../middlewares/media.js";
import authenticateUser, { adminAuth } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validate.js";
import { quizzValidationRules } from "../validationRules.js";

const quizzRouter = express.Router();

quizzRouter.post(
  "/quizzes",
  upload.single("image"),
  quizzValidationRules.createQuizz,
  validateRequest,
  authenticateUser,
  // adminAuth,
  createQuizz
);
quizzRouter.get("/quizzes", readAllQuizzes);
quizzRouter.get(
  "/quizzes/:id",
  quizzValidationRules.readQuizz,
  validateRequest,
  readQuizz
);
// quizzRouter.post(
//   "/quizzes/join/:id",
//   quizzValidationRules.joinQuizz,
//   validateRequest,
//   authenticateUser,
//   joinQuizz
// );
// quizzRouter.post(
//   "/quizzes/leave/:id",
//   quizzValidationRules.leaveQuizz,
//   validateRequest,
//   authenticateUser,
//   leaveQuizz
// );

quizzRouter.post("/increase", authenticateUser, increaseUserPoints);
quizzRouter.post("/check/:id", authenticateUser, checkUserAnswer);

export default quizzRouter;
