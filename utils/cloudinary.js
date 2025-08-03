import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(cloudinaryConfig);
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'biodata-users',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
export { cloudinaryConfig, storage };
