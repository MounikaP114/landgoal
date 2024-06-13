import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth-router.js";
dotenv.config();

const app = express();
const PORT = 3001;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to  mongo db successfully");
  })
  .catch((error) => {
    console.log("Error while connecting to mongodb,", error);
  });

app.use(express.json());
app.use("/", userRouter);
app.use("/", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Issue";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to ${PORT}`);
});
