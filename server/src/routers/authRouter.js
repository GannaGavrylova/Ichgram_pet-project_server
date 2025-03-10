import { Router } from "express";
import register from "../controllers/auth/register.js";
import login from "../controllers/auth/login.js";

const router = Router();

router.get("/check-username/:username", register);
router.post("/register", register);
router.post("/login", login);

export default router;
