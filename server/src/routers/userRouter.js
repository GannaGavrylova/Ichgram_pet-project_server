import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/user/getById.js";
import getUserPost from "../controllers/posts/getUserPost.js";
import {
  updeteUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

const router = Router();

router.get("/home", getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.put("/:id/profile", authenticateJWT, updeteUserProfile);
router.get("/:id/posts", getUserPost);

export default router;
