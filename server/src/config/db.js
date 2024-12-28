import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Connection to the MongoDB is successfully");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};
