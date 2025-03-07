import sequelize from "../database.js";
import { DataTypes } from "sequelize";
import Question from "./Question.js";
import User from "./User.js";

// Define the Quizz model
const Quizz = sequelize.define("Quizz", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  awardPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

// Define one-to-many relationship with Questions
Quizz.hasMany(Question, {
  foreignKey: "quizzId",
  as: "questions",
  onDelete: "CASCADE",
});

Question.belongsTo(Quizz, {
  foreignKey: "quizzId",
  as: "quizz",
  onDelete: "CASCADE",
});

export { Quizz };
