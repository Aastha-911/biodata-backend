import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
