import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:userId/notifications");
router.post("/notifications");
router.delete("/notifications/:notificationId");
router.patch("/notifications/:notificationId");

export default router;
