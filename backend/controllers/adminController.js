// Controller for the Admin Page.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

import LocalStrategy from "passport-local";
import User from "../models/User.js";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect Password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password." });
    }
    console.log(user.role);
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, error: "The given user was not an admin." });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error logging in: " + err.message });
  }
};

// CRUD for Users

export const viewAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error: " + err.message });
  }
};

export const viewUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Can't find user." });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error: " + err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      username,
      email,
      firstName,
      lastName,
      profilePicture,
      points,
      role,
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    await user.update({
      username,
      email,
      firstName,
      lastName,
      profilePicture,
      points,
      role,
    });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error: " + error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    await user.destroy();
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error: " + error.message });
  }
};
