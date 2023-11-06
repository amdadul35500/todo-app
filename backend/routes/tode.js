import express from "express";
import Todo from "../models/Todo.js";

const todoRouter = express.Router();

// add todo
todoRouter.post("/", async (req, res, next) => {
  try {
    const todoObj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    const newTodo = await new Todo(todoObj);
    const todo = await newTodo.save();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// get todo
todoRouter.get("/", async (req, res, next) => {
  try {
    const todo = await Todo.find();
    res.send(todo);
  } catch (error) {
    next(error);
  }
});

export default todoRouter;
