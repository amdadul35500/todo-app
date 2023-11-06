import bcrypt from "bcrypt";
import express from "express";
import User from "../models/userModal.js";
import { generateToken } from "../utilis.js";

const userRouter = express.Router();

// Login
userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token: await generateToken(user),
      });
      return;
    }
  }
  res.status(500).send({ message: "Invalid email or password!" });
});

// Registet
userRouter.post("/signup", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = new User(userObj);
    const user = await newUser.save();
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: await generateToken(user),
    });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
