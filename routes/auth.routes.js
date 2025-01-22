import express from "express";
import { loginUser, authenticated } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/verify", authenticateToken, authenticated);

export default router;
