import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    job_title: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };