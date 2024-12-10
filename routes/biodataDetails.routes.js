import express from "express";
import { addBioData } from "../controllers/biodataDetails.controller.js";

const router = express.Router();
router.post("/add", addBioData);

export default router;
