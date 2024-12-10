import Template from "../models/template.model.js";

export const addTemplate = async (req, res) => {
  try {
    const { tag } = req.body;
    const baseURL = "https://api.marriagebiodataonline.com/";

    const previewImage = req.files?.previewImage?.[0]?.path
      ? `${baseURL}${req.files.previewImage[0].path}`
      : null;

    const bgImage = req.files?.bgImage?.[0]?.path
      ? `${baseURL}${req.files.bgImage[0].path}`
      : null;

    if (!previewImage || !bgImage) {
      return res.status(400).json({
        success: false,
        message: "Both previewImage and bgImage are required",
      });
    }

    const newTemplate = new Template({ previewImage, bgImage, tag });
    const savedTemplate = await newTemplate.save();

    res.status(201).json({
      success: true,
      message: "Template added successfully!",
      data: savedTemplate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add template",
      error: error.message,
    });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({
      success: true,
      data: templates,
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
    const { previewImage, bgImage, tag } = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      { previewImage, bgImage, tag },
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

    const deletedTemplate = await Template.findByIdAndDelete(id);
    if (!deletedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Template deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete template",
      error: error.message,
    });
  }
};
