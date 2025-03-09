import { Quizz } from "../models/Quizz.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import UserQuizz from "../models/UserQuizz.js";

// CRUD

export const createQuizz = async (req, res) => {
  const { title, desc, questions, awardPoints } = req.body;
  const file = req.file;

  const parsedQuestions = Array.isArray(questions)
    ? questions
    : JSON.parse(questions);

  const imageUrl = file ? `/uploads/${file.filename}` : null;

  try {
    const quizz = await Quizz.create(
      {
        title,
        desc,
        questions: parsedQuestions,
        image: imageUrl,
        awardPoints: Number(awardPoints),
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
  const allQuizzes = await Quizz.findAll({
    include: [
      {
        model: UserQuizz,
        as: "attempts",
        attributes: ["id", "userId", "pointsEarned"],
      },
    ],
  });

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
          model: UserQuizz,
          as: "attempts", //Complete this
          attributes: ["id", "userId", "pointsEarned"],
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

export const checkUserAnswer = async (req, res) => {
  try {
    const user = req.user;
    const quizzId = req.params.id;
    const { answer } = req.body;

    if (!quizzId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Quizz ID and answers are required.",
      });
    }

    // Check if the user has already attempted this quiz
    const existingAttempt = await UserQuizz.findOne({
      where: { userId: user.id, quizzId },
    });

    if (existingAttempt) {
      return res.status(200).json({
        success: true,
        message: "You have already answered this quizz.",
        alreadyComplete: true,
      });
    }

    const quizz = await Quizz.findByPk(quizzId, {
      include: [
        {
          model: Question,
          as: "questions",
          attributes: ["id", "answer"], // Only fetch necessary fields
        },
      ],
    });

    if (!quizz) {
      return res.status(404).json({
        success: false,
        message: "Quizz not found.",
      });
    }

    let score = 0;
    let correctAnswer = false;

    // Checking if the answer matches any of the quiz questions
    for (const question of quizz.questions) {
      if (question.answer === answer) {
        score += quizz.awardPoints;
        correctAnswer = true;
        break; // No need to check further once a correct answer is found
      }
    }

    // Increment user's points in the database
    await user.increment("points", { by: score });

    // Save the attempt
    if (correctAnswer) {
      await UserQuizz.create({
        userId: user.id,
        quizzId,
        answer,
        pointsEarned: score, // Assign actual score
      });
    }

    // Reload user to get updated points
    await user.reload();

    return res.status(200).json({
      success: true,
      message: "Your answers have been submitted.",
      points: user.points, // Ensures updated points are returned
      correctAnswer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
