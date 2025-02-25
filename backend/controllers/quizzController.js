import { Quizz } from "../models/Quizz.js";
import Question from "../models/Question.js";
import User from "../models/User.js";

// CRUD

export const createQuizz = async (req, res) => {
  const { title, desc, questions } = req.body;

  // const parsedQuestions = JSON.parse(questions);

  try {
    const quizz = await Quizz.create(
      {
        title,
        desc,
        questions,
      },
      {
        include: [{ model: Question, as: "questions" }],
      }
    );

    res.status(201).json({ success: true, data: quizz });
  } catch (err) {
    console.error("Error Creating Quizz: ", err.message);
    res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export const readAllQuizzes = async (req, res) => {
  const allQuizzes = await Quizz.findAll();

  return res.status(200).json({ success: true, data: allQuizzes });
};

export const readQuizz = async (req, res) => {
  try {
    const quizzId = req.params.id;

    const quizz = await Quizz.findOne({
      where: { id: quizzId },
      include: [
        {
          model: Question,
          as: "questions",
          attributes: [
            "id",
            "question",
            "isCodingQuestion",
            "answer",
            "inputTestCase1",
            "outputTestCase1",
            "inputTestCase2",
            "outputTestCase2",
          ],
        },
        {
          model: User,
          as: "joinedUsers",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
    });

    if (!quizz) {
      return res
        .status(404)
        .json({ success: false, message: "Can't find the quizz" });
    }

    return res.status(200).json({
      success: true,
      data: quizz,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export const joinQuizz = async (req, res) => {
  try {
    const user = req.user; // Extract user from authentication middleware
    const quizzId = req.params.id; // Extract quizzId from request body

    if (!quizzId) {
      return res.status(400).json({
        success: false,
        message: "Quizz ID is required.",
      });
    }

    // Find the quiz by primary key
    const quizz = await Quizz.findByPk(quizzId);

    if (!quizz) {
      return res.status(404).json({
        success: false,
        message: "Quizz not found.",
      });
    }

    // Associate the user with the quiz (Many-to-Many relationship needed)
    await quizz.addJoinedUsers(user);

    return res.status(200).json({
      success: true,
      message: "User successfully joined the quiz.",
      quizz,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export const leaveQuizz = async (req, res) => {
  try {
    const user = req.user; // Extract authenticated user
    const quizzId = req.params.id; // Extract quizzId from request body

    if (!quizzId) {
      return res.status(400).json({
        success: false,
        message: "Quizz ID is required.",
      });
    }

    // Find the quiz
    const quizz = await Quizz.findByPk(quizzId);

    if (!quizz) {
      return res.status(404).json({
        success: false,
        message: "Quizz not found.",
      });
    }

    // Check if user is part of the quiz
    const isJoined = await quizz.hasJoinedUsers(user);
    if (!isJoined) {
      return res.status(400).json({
        success: false,
        message: "User is not part of this quiz.",
      });
    }

    // Remove the user from the quiz
    await quizz.removeJoinedUsers(user);

    return res.status(200).json({
      success: true,
      message: "User successfully left the quiz.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
