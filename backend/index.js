import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/tode.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5500;
app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});
