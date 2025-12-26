import { Request, Response } from "express";
import { UpdateProfileImageService } from "../../services/user/UpdateProfileImageService";

class UpdateProfileImageController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;
        const file = req.file as Express.Multer.File;

        try {
            const service = new UpdateProfileImageService();
            const user = await service.execute({ userId, file });

            return res.json({
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                },
                message: "Imagem atualizada",
            });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}

export { UpdateProfileImageController };
