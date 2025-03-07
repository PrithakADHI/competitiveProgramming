import sequelize from "../database.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import { Quizz } from "./Quizz.js";

const UserQuizz = sequelize.define("UserQuizz", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    unique: "unique_user_quizz",
  },
  quizzId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quizz,
      key: "id",
    },
    unique: "unique_user_quizz",
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pointsEarned: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

User.hasMany(UserQuizz, {
  foreignKey: "userId",
  as: "attempts",
  onDelete: "CASCADE",
});
Quizz.hasMany(UserQuizz, {
  foreignKey: "quizzId",
  as: "attempts",
  onDelete: "CASCADE",
});

UserQuizz.belongsTo(User, { foreignKey: "userId", as: "user" });
UserQuizz.belongsTo(Quizz, { foreignKey: "quizzId" });

export default UserQuizz;
