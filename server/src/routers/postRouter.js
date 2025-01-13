import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPost } from "../controllers/posts/post.js";

const router = Router();

router.post("/", authMiddleware, createPost);

export default router;
