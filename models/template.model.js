import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    previewImage: { type: String, required: true },
    bgImage: { type: String, required: true },
    tag: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("template", templateSchema);
