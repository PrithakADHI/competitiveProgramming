import { body, param } from "express-validator";

export const quizzValidationRules = {
  createQuizz: [
    body("title").notEmpty().withMessage("Title is Required. "),
    body("desc").notEmpty().withMessage("Description is Required."),
    body("questions.*.question")
      .notEmpty()
      .withMessage("Each question must have a question."),
    body("questions.*.isCodingQuestion")
      .notEmpty()
      .withMessage("Each Question must have isCodingQuestion."),
  ],
  readQuizz: [param("id").isInt().withMessage("Quizz ID must be an integer.")],
  joinQuizz: [param("id").isInt().withMessage("Quizz ID must be an integer.")],
  leaveQuizz: [param("id").isInt().withMessage("Quizz ID must be an integer.")],
};

export const userValidationRules = {
  registerUser: [
    body("email").isEmail().withMessage("A valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("firstName").notEmpty().withMessage("First name is required."),
    body("lastName").notEmpty().withMessage("Last name is required."),
  ],
  loginUser: [
    body("email").isEmail().withMessage("A valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  refreshAccessToken: [
    body("token").notEmpty().withMessage("Refresh Token is required."),
  ],
};
