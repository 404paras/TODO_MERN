import mongoose from "mongoose";

const taskListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    body: { type: String, required: true },  
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  { timestamps: true }
);

export const taskList =  mongoose.model('TaskList', taskListSchema);
