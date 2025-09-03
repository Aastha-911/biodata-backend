import express from "express";
import {
  addBioData,
  getBioDataUsers,
  deleteBioDataById,
} from "../controllers/biodataDetails.controller.js";
import biodataUpload from "../middleware/biodataUpload.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", biodataUpload.single("photo"), addBioData);
router.get("/get", authenticateToken, getBioDataUsers);
router.delete("/delete/:id", authenticateToken, deleteBioDataById);

export default router;
