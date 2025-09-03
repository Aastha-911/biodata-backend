import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

const biodataStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "biodata-users",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const biodataUpload = multer({ storage: biodataStorage });

export default biodataUpload;
