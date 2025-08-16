import express from "express";
import { addBioData, getBioDataUsers } from "../controllers/biodataDetails.controller.js";
import biodataUpload from "../middleware/biodataUpload.js";
const router = express.Router();
router.post("/add", biodataUpload.single('photo'), addBioData);
router.get("/get", getBioDataUsers);

export default router;
