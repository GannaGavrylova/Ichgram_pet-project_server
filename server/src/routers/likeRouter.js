import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import { getPostLikes, likePost, unLikePost } from "../controllers/like.js";

const router = Router();
router.get("/:postId/likes", authenticateJWT, getPostLikes);
router.post("/:postId/like/:userId", authenticateJWT, likePost);
router.delete("/:postId/unlike/:userId", authenticateJWT, unLikePost);
export default router;
