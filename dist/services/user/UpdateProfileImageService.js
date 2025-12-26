"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class UpdateProfileImageService {
    async execute({ userId, file }) {
        if (!file)
            throw new Error("Arquivo de imagem não encontrado");
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto", folder: "avatars", public_id: `${userId}-${file.originalname}` }, (error, result) => {
                if (error || !result)
                    reject(error);
                else
                    resolve(result);
            });
            stream.end(file.buffer);
        });
        const user = await prisma_1.default.user.update({
            where: { id: userId },
            data: { avatar: uploadResult.secure_url },
        });
        return user;
    }
}
exports.UpdateProfileImageService = UpdateProfileImageService;
