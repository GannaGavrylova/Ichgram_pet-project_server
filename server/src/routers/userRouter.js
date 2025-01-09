import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/user/getById.js";
import {
  updeteUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.put("/:id/profile", authenticateJWT, updeteUserProfile);

export default router;
