import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import {
  getUserFollowers,
  getUserFollowing,
  followUserPost,
  unfollowUser,
} from "../controllers/follow.js";

const router = Router();

router.get("/:userId/followers", getUserFollowers);
router.get("/:userId/following", getUserFollowing);
router.post("/:target_user_id/follow", authenticateJWT, followUserPost);
router.delete("/:target_user_id/unfollow", authenticateJWT, unfollowUser);

export default router;
