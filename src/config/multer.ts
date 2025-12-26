import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export default {
    upload() {
        return {
            storage: multer.memoryStorage(),
        };
    },

    uploadToCloudinary(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: file.originalname,
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                }
            );
            stream.end(file.buffer);
        });
    },
};