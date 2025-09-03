import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

// Cloudinary storage config
const templateStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let templateName = req.query?.name || req.body?.name || "default";

    // Trim, replace all spaces with dash, remove extra spaces, lowercase
    templateName = templateName
      .trim()
      .replace(/\s+/g, "-") // replace one or more spaces with dash
      .toLowerCase();

    return {
      folder: `templates/${templateName}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${templateName}-${file.fieldname}`,
    };
  },
});

const templateUpload = multer({ storage: templateStorage });

export default templateUpload;
