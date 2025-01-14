import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/user/getById.js";
import getUsersPosts from "../controllers/posts/getUsersPosts.js";
import {
  updeteUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

const router = Router();

router.get("/home", getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.put("/:id/profile", authenticateJWT, updeteUserProfile);
router.get("/posts", getUsersPosts);

export default router;
