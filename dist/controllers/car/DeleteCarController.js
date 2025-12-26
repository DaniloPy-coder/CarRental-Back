"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCarController = void 0;
const DeleteCarService_1 = require("../../services/car/DeleteCarService");
class DeleteCarController {
    async handle(req, res) {
        const ownerId = req.user_id;
        const { id } = req.params;
        const deleteCarService = new DeleteCarService_1.DeleteCarService();
        try {
            const result = await deleteCarService.execute(id, ownerId);
            return res.json({
                success: true,
                message: result.message
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
exports.DeleteCarController = DeleteCarController;
