import express from "express";
import { addBioData, getBioDataUsers } from "../controllers/biodataDetails.controller.js";
import upload from "../middleware/upload.js";
const router = express.Router();
router.post("/add", upload.single('photo'), addBioData);
router.get("/get", getBioDataUsers);

export default router;
