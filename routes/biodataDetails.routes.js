import express from "express";
import { addBioData, getBioDataUsers } from "../controllers/biodataDetails.controller.js";

const router = express.Router();
router.post("/add", addBioData);
router.get("/get", getBioDataUsers);

export default router;
