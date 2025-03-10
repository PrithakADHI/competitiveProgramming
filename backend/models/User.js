import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
