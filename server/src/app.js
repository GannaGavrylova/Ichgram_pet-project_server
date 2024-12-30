import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this my final project ");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
