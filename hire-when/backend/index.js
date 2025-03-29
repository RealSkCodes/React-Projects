import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

// Routers import
import jobsRouter from "./routes/jobs.routes.js";
import hireaiRouter from "./routes/hireai.routes.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/mongooseDB.config.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// Routers usage
app.use("/", jobsRouter);
app.use("/", hireaiRouter);
app.use("/", userRouter);

// Websocket setup
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`App running on Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
