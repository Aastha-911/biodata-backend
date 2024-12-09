import express from "express";
import { addBioData } from "../controllers/biodataDetails.controller.js"; // Adjust the path if needed

const router = express.Router();

router.post("/add", addBioData);

export default router;
