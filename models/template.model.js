import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    previewImage: { type: String, required: true },
    bgImage: { type: String, required: true },
    tag: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one tag is required",
      },
    },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["paid", "free"],
      default: "free",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          if (this.type === "paid") {
            return value > 0;
          }
          return true;
        },
        message: "Price must be greater than 0 for paid templates",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("template", templateSchema);
