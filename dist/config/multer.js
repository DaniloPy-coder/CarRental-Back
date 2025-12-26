"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
exports.default = {
    upload() {
        return {
            storage: multer_1.default.memoryStorage(),
        };
    },
    uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "auto",
                public_id: file.originalname,
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
            stream.end(file.buffer);
        });
    },
};
