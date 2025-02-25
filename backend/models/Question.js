import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isCodingQuestion: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inputTestCase1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outputTestCase1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inputTestCase2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outputTestCase2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Question;
