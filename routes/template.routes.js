import express from "express";
import { upload } from "../utils/multerConfig.js";
import {
  addTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "previewImage", maxCount: 1 },
  { name: "bgImage", maxCount: 1 },
]);
router.post("/", uploadFields, addTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.put("/:id", uploadFields, updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
