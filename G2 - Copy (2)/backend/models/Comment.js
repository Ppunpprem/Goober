import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"; 
import { Bin } from "../models/Bin.js";

const commentSchema = new mongoose.Schema({
  // comment_id: { type: Number, unique: true }, // Auto-incrementing comment_id
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  bin: { type: mongoose.Schema.Types.ObjectId, ref: "Bin", required: true }, // Reference to Bin
  text: { type: String, required: true }, // Comment text
  createdAt: { type: Date, default: Date.now }, // Timestamp
});
const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
