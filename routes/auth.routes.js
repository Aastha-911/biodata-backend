import express from "express";
import {
  loginUser,
  registerUser,
  getUserDetails,
  getAllUsers,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserDetails);
router.get("/", getAllUsers);
router.put("/update-password", updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
