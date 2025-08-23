import express from "express";
import {
  addTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateImages,
} from "../controllers/template.controller.js";
import templateUpload from "../middleware/templateUpload.js";
import { authenticateToken } from "../middleware/auth.js";
import cloudinaryRewriteMiddleware from "../middleware/cloudinaryRewriteMiddleware.js";
const router = express.Router();

// Cloudinary upload for preview + background images
const uploadFields = templateUpload.fields([
  { name: "previewImage", maxCount: 1 },
  { name: "bgImage", maxCount: 1 },
]);

// Routes
router.post("/add", authenticateToken, uploadFields, addTemplate);
router.get("/", cloudinaryRewriteMiddleware, getAllTemplates);
router.get("/images", cloudinaryRewriteMiddleware, getTemplateImages)
router.get("/:id", cloudinaryRewriteMiddleware, getTemplateById);
router.put("/:id", authenticateToken, uploadFields, updateTemplate);
router.delete("/:id", authenticateToken, deleteTemplate);

export default router;
