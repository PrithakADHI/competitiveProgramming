import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./database.js";

import authRouter from "./routes/authRoutes.js";
import quizzRouter from "./routes/quizzRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

import { Server } from "socket.io";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/api", quizzRouter);
app.use("/admin", adminRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Express is working." });
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
  });
});

app.use("/uploads", express.static("uploads"));

const runApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect: ", err);
  }
};

runApp();
