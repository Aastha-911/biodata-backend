import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Db connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/marriage-biodata`);
  } catch (error) {
    console.log("error in mongoose", error);
  }
};

export default connectDB;
