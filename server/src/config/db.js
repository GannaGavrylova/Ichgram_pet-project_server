import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // user: process.env.MONGO_INITDB_ROOT_USERNAME || "root",
      // password: process.env.MONGO_INITDB_ROOT_PASSWORD || "",
    });
    console.log("Connection to the MongoDB is successfully");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};
