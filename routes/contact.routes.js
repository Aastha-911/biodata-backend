import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contact.controller.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", createContact);
router.get("/getAll", authenticateToken, getAllContacts);

export default router;
