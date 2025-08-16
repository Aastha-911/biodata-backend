import Template from "../models/template.model.js";
import { cloudinary } from "../utils/cloudinary.js";
export const addTemplate = async (req, res) => {
  try {
    let { tag, name, type, price } = req.body;
    // Ensure tag is always an array
    if (typeof tag === "string") {
      try {
        // Try parsing JSON string
        tag = JSON.parse(tag);
      } catch {
        // Fallback: split by comma
        tag = tag.split(",").map((t) => t.trim());
      }
    }

    const previewImage = req.files?.previewImage?.[0]?.path || null;
    const bgImage = req.files?.bgImage?.[0]?.path || null;

    if (!previewImage || !bgImage) {
      return res.status(400).json({
        success: false,
        message: "Both previewImage and bgImage are required",
      });
    }
    if (!name || !tag || tag.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and at least one tag are required",
      });
    }
    const newTemplate = new Template({
      previewImage,
      bgImage,
      tag,
      name,
      type: type || "free",
      price: type === "paid" ? price : 0,
    });

    const savedTemplate = await newTemplate.save();

    res.status(201).json({
      success: true,
      message: "Template added successfully!",
      data: savedTemplate,
    });
  } catch (error) {
    console.error("ADD TEMPLATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add template",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({
      success: true,
      data: templates,
      message: "Templates fetched successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
      error: error.message,
    });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }
    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
      error: error.message,
    });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    let { tag, name, type, price } = req.body;

    // Ensure tag is always an array if provided
    if (tag) {
      if (typeof tag === "string") {
        try {
          tag = JSON.parse(tag);
        } catch {
          tag = tag.split(",").map((t) => t.trim());
        }
      }
    }

    const previewImage = req.files?.previewImage?.[0]?.path || req.body.previewImage;
    const bgImage = req.files?.bgImage?.[0]?.path || req.body.bgImage;

    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      {
        previewImage,
        bgImage,
        tag,
        name,
        type: type || "free",
        price: type === "paid" ? price : 0,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Template updated successfully!",
      data: updatedTemplate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update template",
      error: error.message,
    });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Delete preview image if exists
    if (template.previewImagePublicId) {
      await cloudinary.uploader.destroy(template.previewImagePublicId);
    }

    // Delete background image if exists
    if (template.bgImagePublicId) {
      await cloudinary.uploader.destroy(template.bgImagePublicId);
    }

    // Finally delete template from DB
    await template.deleteOne();

    res.status(200).json({ message: "Template and images deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ message: "Error deleting template", error });
  }
};

