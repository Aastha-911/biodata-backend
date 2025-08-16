import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

// Cloudinary storage config
const templateStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const templateName =
            req.query?.name || req.body?.name?.trim().replace(/\s+/g, "_") || "default";

        return {
            folder: `templates/${templateName}`,
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: `${Date.now()}-${file.fieldname}`,
        };
    },
});


const templateUpload = multer({ storage: templateStorage });

export default templateUpload;
