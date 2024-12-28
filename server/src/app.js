import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
