"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileImageController = void 0;
const UpdateProfileImageService_1 = require("../../services/user/UpdateProfileImageService");
class UpdateProfileImageController {
    async handle(req, res) {
        const userId = req.user_id;
        const file = req.file;
        try {
            const service = new UpdateProfileImageService_1.UpdateProfileImageService();
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
        }
        catch (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.UpdateProfileImageController = UpdateProfileImageController;
