import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskList"
      }
    ]
  },
  { timestamps: true }
);

export const User =  mongoose.model("User", userSchema);
