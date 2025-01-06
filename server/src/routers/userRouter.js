import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/user/getById.js";
import { updateUserProfile } from "../controllers/userController.js";
const router = Router();

router.get("/:id", authenticateJWT, getUserById);
router.put("/:id/profile", authenticateJWT, updateUserProfile);

export default router;
