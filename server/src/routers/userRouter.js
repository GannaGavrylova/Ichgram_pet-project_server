import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/user/getById.js";
import getUsersPosts from "../controllers/posts/getUsersPosts.js";
import { getUserPosts } from "../controllers/posts/post.js";
import upload from "../middlewares/multer.js";
import {
  updeteUserProfile,
  getAllUsers,
  getUserProfile,
  getRandomUsers,
} from "../controllers/userController.js";

const router = Router();

router.get("/home", getAllUsers);
router.get("/explore", getRandomUsers);
router.get("/posts", getUsersPosts);
router.get("/:id", authenticateJWT, getUserProfile, getUserPosts);
router.get("/:userId/other-user", getUserProfile, getUserPosts);
router.put(
  "/:id/profile",
  authenticateJWT,
  upload.single("profileImage"),
  updeteUserProfile
);
router.get("/posts", getUsersPosts);

export default router;
