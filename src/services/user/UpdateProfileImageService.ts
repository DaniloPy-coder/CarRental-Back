import prismaClient from "../../prisma";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface Request {
    userId: string;
    file: Express.Multer.File;
}

class UpdateProfileImageService {
    async execute({ userId, file }: Request) {
        if (!file) throw new Error("Arquivo de imagem não encontrado");

        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: "avatars", public_id: `${userId}-${file.originalname}` },
                (error, result) => {
                    if (error || !result) reject(error);
                    else resolve(result);
                }
            );
            stream.end(file.buffer);
        });

        const user = await prismaClient.user.update({
            where: { id: userId },
            data: { avatar: uploadResult.secure_url },
        });

        return user;
    }
}

export { UpdateProfileImageService };
