import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import getUserById from "../controllers/getById.js";
const router = Router();

router.get("/:id", authenticateJWT, getUserById);

export default router;
