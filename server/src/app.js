import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import seachRouter from "./routers/searchRouter.js";
import postRouter from "./routers/postRouter.js";
import commentRouter from "./routers/commentRouter.js";
import likeRouter from "./routers/likeRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this my final project ");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/search", seachRouter);
app.use("/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/likes", likeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
