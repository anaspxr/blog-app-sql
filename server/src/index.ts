import express, { NextFunction, Request, Response } from "express";
import pool from "./configs/db";
import dotenv from "dotenv";
import globalErrorHandle from "./middlewares/globalErrorHandle";
import userRouter from "./routes/userRoutes";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use("/user", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

app.use(globalErrorHandle);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
