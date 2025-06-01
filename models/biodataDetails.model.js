import mongoose from "mongoose";

const bioDataDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    pob: { type: String, required: true, trim: true },
    education: { type: String, required: true, trim: true },
    work: { type: String, trim: true },
    contactNo: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("bioDataDetails", bioDataDetailsSchema);
