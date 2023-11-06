import mongoose from "mongoose";

const todo = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestapms: true }
);

const Todo = mongoose.model("Todo", todo);
export default Todo;
