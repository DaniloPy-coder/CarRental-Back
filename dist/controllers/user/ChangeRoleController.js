"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserRoleController = void 0;
const ChangeRoleService_1 = require("../../services/user/ChangeRoleService");
class ChangeUserRoleController {
    async handle(req, res) {
        try {
            const userId = req.user_id;
            const service = new ChangeRoleService_1.ChangeUserRoleService();
            const user = await service.execute(userId);
            return res.json({
                success: true,
                message: 'Agora você é um OWNER!',
                user,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.ChangeUserRoleController = ChangeUserRoleController;
