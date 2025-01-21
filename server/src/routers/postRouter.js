import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
  getUserPosts,
} from "../controllers/posts/post.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/", authMiddleware, upload.single("images"), createPost);
router.get("/single/:postId", authMiddleware, getPostById);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);
router.get("/all", authMiddleware, getUserPosts);
export default router;
