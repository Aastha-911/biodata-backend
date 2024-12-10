import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contact.controller.js";
import { authenticateAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", createContact);
router.get("/getAll", authenticateAdmin, getAllContacts);

export default router;
